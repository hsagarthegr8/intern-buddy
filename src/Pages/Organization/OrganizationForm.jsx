import React, { Component } from 'react'
import { withFormik } from 'formik'
import { withRouter } from 'react-router-dom'
import * as yup from 'yup'
import { Grid, Typography, Button, FormLabel, 
    RadioGroup, Radio, FormControlLabel, Paper } from '@material-ui/core'
import { Edit, Close, Done, Delete} from '@material-ui/icons'
import { TextField } from '../../Components'
import api from '../../api'

class OrganizationForm extends Component {
    
    onDelete = () => {
        const {organization} = this.props
        api.delete(`/api/organizations/${organization._id}`).then(res => {
            this.props.history.replace('/organizations')
        })
    }

    render() {
        const { readOnly, toggleReadOnly, organization, 
            values, handleChange, handleSubmit } = this.props

        return (
            <Paper className="p-30">
            <form noValidate>
                <Grid container direction="row" justify="space-between">
                    <Grid item>
                        <Typography variant="h6">
                            {organization ? organization.organizationName : 'Add New Organization'}
                        </Typography>
                    </Grid>
                    <Grid item>
                    {readOnly ? 
                    (
                    <>
                        <Button
                        color="primary" 
                        variant="contained" 
                        className="mr-30"
                        startIcon={<Delete />}
                        onClick={this.onDelete}
                        >
                            Delete 
                        </Button>
                        <Button 
                        color="primary" 
                        variant="contained" 
                        startIcon={<Edit />}
                        onClick={toggleReadOnly}
                        >
                            Edit 
                        </Button>
                    </>

                    ):(
                        <>
                            <Button 
                                color="secondary" 
                                variant="outlined" 
                                startIcon={<Close />}
                                className="mr-30"
                                onClick={toggleReadOnly}
                            >
                                Cancel 
                            </Button>
                            <Button 
                            color="primary" 
                            variant="contained" 
                            startIcon={<Done />}
                            onClick={handleSubmit}
                            >
                                {organization ? 'Update' : 'Add'} 
                            </Button>
                        </>
                    )}
                    </Grid>
                </Grid>
                <Grid container className="mt-30">
                    <Grid item md={6}>
                    <Grid container className="form-field" justify="space-between">
                    <Grid item md={5}>
                        <TextField
                            required 
                            fullWidth
                            disabled={readOnly}
                            name="organizationName" 
                            label="Organization Name"
                        />
                    </Grid>
                    <Grid item md={5}>
                        <TextField 
                            required 
                            fullWidth
                            disabled={readOnly}
                            name="organizationWebsite"
                            label="Organization Website"
                        />
                    </Grid>
                </Grid>
                <Grid container className="form-field" justify="space-between">
                    <Grid item md={5}>
                        <TextField 
                            required 
                            fullWidth
                            disabled={readOnly}
                            name="supervisorName" 
                            label="Supervisor Name"
                        />
                    </Grid>
                    <Grid item md={5}>
                        <TextField 
                            required 
                            fullWidth
                            disabled={readOnly}
                            name="supervisorEmail"
                            label="Supervisor Email"
                        />
                    </Grid>
                    
                    </Grid>
                    <Grid container className="form-field" justify="space-between">
                        <Grid item md={5}>
                        <TextField 
                            fullWidth 
                            disabled={readOnly}
                            name="supervisorContactNo" 
                            label="Supervisor Contact Number" 
                            />
                        </Grid>
                        <Grid item md={5}>
                        <TextField 
                            fullWidth 
                            disabled={readOnly}
                            name="organizationCity" 
                            label="Organization City" 
                            />
                        </Grid>
                    </Grid>
                    <Grid container className="form-field" justify="space-between" alignItems="center">
                        <Grid item md={5}>
                            <FormLabel component="legend">
                                <Typography 
                                variant="caption" 
                                style={{ color: 'black'}}
                                >
                                    Internship Type
                                </Typography>
                            </FormLabel>
                            <RadioGroup 
                                name="internshipType" 
                                value={values.internshipType} 
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    value="trainingPaid" 
                                    disabled={readOnly}
                                    control={<Radio  color="primary"/>} 
                                    label="Paid Training" 
                                />
                                <FormControlLabel 
                                    value="stipend" 
                                    disabled={readOnly}
                                    control={<Radio color="primary"/>} 
                                    label="Provides Stipend" 
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item md={5}>
                            <TextField 
                                required
                                fullWidth 
                                disabled={readOnly}
                                name="internshipAmount" 
                                label="Amount"
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <TextField 
                            fullWidth 
                            multiline
                            disabled={readOnly}
                            rows={3}
                            rowsMax={3}
                            name="organizationAddress" 
                            label="Organization Address" 
                        />
                    </Grid>
                </Grid>
                
                </Grid>
            </form>
            </Paper>
        )}
}


const formConfig = withFormik({
    mapPropsToValues: ({organization}) => ({
        organizationName: organization ? organization.organizationName : '',
        organizationCity: organization ? organization.organizationCity : '',
        organizationWebsite: organization ? organization.organizationWebsite : '',
        organizationAddress: organization ? organization.organizationAddress : '',
        supervisorContactNo: organization ? organization.supervisorContactNo : '',
        supervisorEmail: organization ? organization.supervisorEmail : '',
        supervisorName: organization ? organization.supervisorName : '',
        internshipType: organization ? (organization.stipend ? 'stipend' : 'trainingPaid') : '',
        internshipAmount: organization ? 
            (organization.stipend ? organization.stipendAmount : organization.trainingAmount) : ''
    }),

    validationSchema: yup.object().shape({
        organizationName: yup.string().required().label('Organization Name'),
        organizationCity: yup.string().required().label('Organization City'),
        organizationWebsite: yup.string().url().required().label('Organization Website'),
        organizationAddress: yup.string().required().label('Organization Website'),
        supervisorContactNo: yup.string().length(10).matches(/[0-9]*/).required().label('Supervisor Contact Number'),
        supervisorEmail: yup.string().email().required().label('Supervisor Email'),
        supervisorName: yup.string().required().label('Supervisor Name'),
        internshipType: yup.string().required().label('Internship Type'),
        internshipAmount: yup.number().required().label('Amount')
    }),

    handleSubmit: (values, formikBag) => {
        const { organization, toggleReadOnly, addMode } = formikBag.props
        console.log(formikBag.props)
        const body = {
            ...values
        }
        console.log(body)
        if (body.internshipType === 'stipend') {
            body.stipend = true
            body.stipendAmount = body.internshipAmount
        }
        else {
            body.trainingPaid = true
            body.trainingAmount = body.internshipAmount
        }
        delete body.internshipType
        delete body.internshipAmount

        if (!organization) {
            console.log('hello')
            api.post('/api/organizations', body).then(res => {
                formikBag.props.history.replace('/organizations/')
            })
        }
        api.patch(`/api/organizations/${organization._id}`, body).then(res => {
            toggleReadOnly()
        })
        
    }
})


export default withRouter(formConfig(OrganizationForm))