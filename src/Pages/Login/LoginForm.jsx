import React from 'react'
import { Grid, TextField, Button, Switch, FormControlLabel } from '@material-ui/core'
import { withFormik } from 'formik'
import * as yup from 'yup'
import api from '../../api'

const LoginForm = (props) => {
    const { values, handleChange, handleSubmit, handleReset, handleBlur, errors, touched } = props 
    return (
        <form noValidate onSubmit={handleSubmit}>
            <Grid container>
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
                        error={touched.userId && Boolean(errors.userId)}
                        helperText={touched.userId && errors.userId}
                        value={values.userId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size="small"
                        className="form-field"
                        variant="outlined"
                        label="User Id"
                    />
                </Grid>
                <Grid item sm={12}>
                    <TextField 
                        required
                        fullWidth 
                        name="password"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size="small"
                        type="password"
                        className="form-field"
                        variant="outlined"
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

    handleSubmit: (values) => {
        const { userId, password, isAdmin } = values
        const body = {
            userId,
            password,
            userType: isAdmin ? 'admin' : 'student'
        }

        api.post('auth/login', body)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.message))
    }
})

export default formConfig(LoginForm)