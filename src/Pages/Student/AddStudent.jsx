import React, { Component } from 'react'
import { withFormik } from 'formik'
import { withRouter } from 'react-router-dom'
import * as yup from 'yup'
import { Grid, Typography, Button, Paper } from '@material-ui/core'
import {  Done } from '@material-ui/icons'
import { TextField } from '../../Components'
import api from '../../api'

class AddStudent extends Component {
    
    render() {
        const { handleSubmit } = this.props

        return (
            <Paper className="p-30">
            <form noValidate>
                <Grid container direction="row" justify="space-between">
                    <Grid item>
                        <Typography variant="h6">
                            Add Student
                        </Typography>
                    </Grid>
                    <Grid item>
                            <Button 
                            color="primary" 
                            variant="contained" 
                            startIcon={<Done />}
                            onClick={handleSubmit}
                            >
                                Add
                            </Button>
                    </Grid>
                </Grid>
                <Grid container className="mt-30">
                    <Grid item md={6}>
                    <Grid container className="form-field" justify="space-between">
                    <Grid item md={5}>
                        <TextField
                            required 
                            fullWidth
                            name="firstName" 
                            label="First Name"
                        />
                    </Grid>
                    <Grid item md={5}>
                        <TextField 
                            required 
                            fullWidth
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
                            name="email" 
                            label="Email"
                        />
                    </Grid>
                    <Grid item md={5}>
                        <TextField 
                            required 
                            fullWidth
                            name="contactNo"
                            label="Contact Number"
                        />
                    </Grid>
                    
                    </Grid>
                    <Grid container className="form-field" justify="space-between">
                        <Grid item md={5}>
                        <TextField 
                            fullWidth 
                            type="password"
                            name="password" 
                            label="Password" 
                            />
                        </Grid>
                    </Grid>
                    
                </Grid>
                
                </Grid>
            </form>
            </Paper>
        )}
}


const formConfig = withFormik({
    mapPropsToValues: () => ({
        firstName:  '',
        lastName: '',
        email: '',
        contactNo:  '',
        password:  ''
    }),

    validationSchema: yup.object().shape({
        firstName: yup.string().required().label('First Name'),
        lastName: yup.string().required().label('Last Name'),
        email: yup.string().email().required().label('Email'),
        password: yup.string().required().min(8).max(24).label('Password'),
        contactNo: yup.string().length(10).matches(/[0-9]*/).required().label('Supervisor Contact Number')
    }),

    handleSubmit: (values, formikBag) => {
        api.post('/api/students', values).then(res => {
            formikBag.props.history.replace('/students')
        })
    }
})


export default withRouter(formConfig(AddStudent))