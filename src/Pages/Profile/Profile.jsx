import React, { Component } from 'react'
import { Grid, Paper, Button, Typography } from '@material-ui/core'
import { Edit, Close, Done } from '@material-ui/icons'
import { withFormik } from 'formik'
import { TextField } from '../../Components'

class Profile extends Component {
    state =  {
        readOnly: true
    }

    toggleReadOnly = () => {
        this.setState(prevState => ({
            readOnly: !prevState.readOnly
        }))
    }

    render() {
        const { readOnly } = this.state
        return (
            <Paper className="p-30" style={{minHeight: 400}}>
                <form noValidate>
                    <Grid container direction="row" justify="space-between">
                        <Grid item>
                            <Typography variant="h6">Your Profile</Typography>
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
                                name="firstName" 
                                label="First Name"
                            />
                        </Grid>
                        <Grid item md={5}>
                            <TextField 
                                required 
                                fullWidth
                                disabled={readOnly}
                                name="lastName"
                                label="Last Name"
                            />
                        </Grid>
                    </Grid>
                    <Grid container className="form-field" justify="space-between">
                        <Grid item md={5}>
                            <TextField 
                                required 
                                fullWidth
                                disabled={readOnly}
                                name="email" 
                                label="Email"
                            />
                        </Grid>
                        <Grid item md={5}>
                            <TextField 
                                required 
                                fullWidth
                                disabled={readOnly}
                                name="contactNo"
                                label="Contact Number"
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
                                name="address" 
                                label="Address" 
                             />
                        </Grid>
                    </Grid>
                    
                    </Grid>
                </form>
            </Paper>
        )
    }
}
   
const formConfig = withFormik({
    mapPropsToValues: ({profile}) => ({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        contactNo: profile.contactNo,
        address: profile.address
    })
})

export default formConfig(Profile)