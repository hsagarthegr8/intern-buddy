import React, { Component } from 'react'
import { withFormik } from 'formik'
import { Grid, Typography, Button } from '@material-ui/core'
import { Edit, Close, Done} from '@material-ui/icons'
import { TextField, Switch } from '../../Components'

class OrganizationForm extends Component {
    state = {
        readOnly: true
    }

    toggleReadOnly = () => {
        this.setState(prevState => ({
            readOnly: !prevState.readOnly
        }))
    }

    render() {
        const { readOnly } = this.state
        const { organization } = this.props
        return (
            <form noValidate>
                <Grid container direction="row" justify="space-between">
                    <Grid item>
                        <Typography variant="h6">
                            {organization.organizationName}
                        </Typography>
                    </Grid>
                    <Grid item>
                    {readOnly ? 
                    (<Button 
                        color="primary" 
                        variant="contained" 
                        startIcon={<Edit />}
                        onClick={this.toggleReadOnly}
                    >
                        Edit 
                    </Button>
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
                                Update 
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
                    <Grid container className="form-field" justify="space-between">
                        <Grid item md={5}>
                        <Switch label="Stipend" labelPlacement="top" name="stipend"/>
                        </Grid>
                        <Grid item md={5}>
                        <TextField 
                            fullWidth 
                            disabled={readOnly}
                            name="stipendAmount" 
                            label="Stipend Amount $" 
                            />
                        </Grid>
                    </Grid>
                    <Grid container className="form-field" justify="space-between">
                        <Grid item md={5}>
                        <Switch label="Training Paid" labelPlacement="top" name="trainingPaid"/>
                        </Grid>
                        <Grid item md={5}>
                        <TextField 
                            fullWidth 
                            disabled={readOnly}
                            name="trainingAmount " 
                            label="Training Amount $" 
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
        )}
}


const formConfig = withFormik({
    mapPropsToValues: ({organization}) => ({
        organizationName: organization ? organization.organizationName : '',
        organizationCity: organization ? organization.organizationCity : '',
        organizationWebsite: organization ? organization.organizationWebsite : '',
        organizationAddress: organization ? organization.organizationAddress : '',
        stipend: organization ? organization.stipend : '',
        stipendAmount: organization ? organization.stipendAmount : '',
        supervisorContactNo: organization ? organization.supervisorContactNo : '',
        supervisorEmail: organization ? organization.supervisorEmail : '',
        supervisorName: organization ? organization.supervisorName : '',
        trainingAmount: organization ? organization.trainingAmount : '',
        trainingPaid: organization ? organization.trainingPaid : ''
    })
})


export default formConfig(OrganizationForm)