import React, { Component } from 'react'
import { withFormik } from 'formik'
import { Grid, Typography, Button, FormLabel, 
    RadioGroup, Radio, FormControlLabel, Paper } from '@material-ui/core'
import { Edit, Close, Done, Delete} from '@material-ui/icons'
import { TextField } from '../../Components'

class OrganizationForm extends Component {
    state = {
        readOnly: true
    }

    toggleReadOnly = () => {
        this.setState(prevState => ({
            readOnly: !prevState.readOnly
        }))
    }

    componentDidMount() {
        const { organization } = this.props
        if (!organization) {
            this.setState({readOnly: false})
        }
    }

    render() {
        const { readOnly } = this.state
        const { organization, values, handleChange } = this.props

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
                        onClick={this.toggleReadOnly}
                        >
                            Delete 
                        </Button>
                        <Button 
                        color="primary" 
                        variant="contained" 
                        startIcon={<Edit />}
                        onClick={this.toggleReadOnly}
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
                                onClick={this.toggleReadOnly}
                            >
                                Cancel 
                            </Button>
                            <Button 
                            color="primary" 
                            variant="contained" 
                            startIcon={<Done />}
                            onClick={this.toggleReadOnly}
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
        stipendAmount: organization ? organization.stipendAmount : '',
        supervisorContactNo: organization ? organization.supervisorContactNo : '',
        supervisorEmail: organization ? organization.supervisorEmail : '',
        supervisorName: organization ? organization.supervisorName : '',
        trainingAmount: organization ? organization.trainingAmount : '',
        internshipType: organization ? (organization.stipend ? 'stipend' : 'trainingPaid') : '',
        internshipAmount: organization ? 
            (organization.stipend ? organization.stipendAmount : organization.trainingAmount) : ''
    })
})


export default formConfig(OrganizationForm)