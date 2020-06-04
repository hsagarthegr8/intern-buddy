import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { withFormik } from 'formik'
import { TextField } from '../../Components'
import * as yup from 'yup'
import api from '../../api'

const RegisterForm = (props) => {
    const { handleSubmit, handleReset } = props 
    return (
        <form noValidate onSubmit={handleSubmit}>
            <Grid container>
                <Typography className="form-field" variant="h6">Register Here</Typography>
                <Grid item sm={12}>
                    <TextField 
                        required
                        fullWidth 
                        name="userId"
                        className="form-field"
                        label="User Id"
                    />
                </Grid>
                <Grid item sm={12}>
                    <TextField 
                        required
                        fullWidth 
                        name="firstName"
                        className="form-field"
                        label="First Name"
                    />
                </Grid>
                <Grid item sm={12}>
                    <TextField 
                        required
                        fullWidth 
                        name="lastName"
                        className="form-field"
                        label="Last Name"
                    />
                </Grid>
               
                <Grid item sm={12}>
                    <TextField 
                        required
                        fullWidth 
                        name="email"
                        className="form-field"
                        label="Email"
                    />
                </Grid>
               
                <Grid item sm={12}>
                    <TextField 
                        required
                        fullWidth 
                        name="password"
                        type="password"
                        className="form-field"
                        label="Password"
                    />
                </Grid>
                <Grid item sm={12}>
                    <Grid container justify="space-between" direction="row-reverse">
                        <Button type="submit" color="primary" variant="contained">Register</Button>
                        <Button color="secondary" variant="outlined" onClick={handleReset}>Reset</Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}


const formConfig = withFormik({
    displayName: "Register Form",

    mapPropsToValues: props => ({
        userId: '',
        email: '',
        firstName: '',
        lastName: '',
        password: ''    
    }),

    validationSchema: yup.object().shape({
        userId: yup.string().required().min(8).max(24).label('User Id'),
        firstName: yup.string().required().label('First Name'),
        lastName: yup.string().required().label('Last Name'),
        email: yup.string().email().required().label('Email'),
        password: yup.string().required().min(8).max(24).label('Password')
    }),

    handleSubmit: (values, formikBag) => {        
        api.post('auth/register', values)
        .then(res => {
            formikBag.props.onRegister()
        })
        .catch(err => console.log(err.message))
    }
})

export default formConfig(RegisterForm)