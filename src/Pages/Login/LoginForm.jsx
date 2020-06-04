import React from 'react'
import { Grid, Button, Switch, FormControlLabel, Typography } from '@material-ui/core'
import { withFormik } from 'formik'
import { TextField } from '../../Components'
import * as yup from 'yup'
import api from '../../api'

const LoginForm = (props) => {
    const { values, handleChange, handleSubmit, handleReset, handleBlur, errors, touched } = props 
    return (
        <form noValidate onSubmit={handleSubmit}>
            <Grid container>
                <Typography className="form-field" variant="h6">Login Here</Typography>
                <Grid item sm={12}>
                    <FormControlLabel 
                        name="isAdmin"
                        label="Is Admin?" 
                        labelPlacement="start" 
                        value={values.isAdmin}
                        onChange={handleChange}
                        control={<Switch color="primary"/>} 
                        style={{float: 'right'}}
                        className="form-field"
                    />
                </Grid>
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
                        name="password"
                        type="password"
                        className="form-field"
                        label="Password"
                    />
                </Grid>
                <Grid item sm={12}>
                    <Grid container justify="space-between" direction="row-reverse">
                        <Button type="submit" color="primary" variant="contained">Login</Button>
                        <Button color="secondary" variant="outlined" onClick={handleReset}>Reset</Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}


const formConfig = withFormik({
    displayName: "Login Form",

    mapPropsToValues: props => ({
        userId: '',
        password: '',
        isAdmin: false
    }),

    validationSchema: yup.object().shape({
        userId: yup.string().required().min(8).max(24).label('User Id'),
        password: yup.string().required().min(8).max(24).label('Password')
    }),

    handleSubmit: (values, formikBag) => {
        const { userId, password, isAdmin } = values
        const body = {
            userId,
            password,
            userType: isAdmin ? 'admin' : 'student'
        }
        
        api.post('auth/login', body)
        .then(res => {
            console.log(res.data)
            formikBag.props.onLogin(res.data)
        })
        .catch(err => console.log(err.message))
    }
})

export default formConfig(LoginForm)