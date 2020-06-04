import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { Edit, Done, Close } from '@material-ui/icons'

import { withFormik } from 'formik'
import * as yup from 'yup'
import { TextField } from '../../Components'
import api from '../../api'

const PersonalDetailsForm = props => {
    const { readOnly, toggleReadOnly, handleSubmit } = props
    return (
        <form noValidate>
            <Grid container justify="space-between" className="mt-30">
                <Typography variant="h6">Personal Details</Typography>
                <Grid item>
                    {readOnly ?
                    <Button 
                        color="primary" 
                        variant="contained" 
                        startIcon={<Edit />}
                        onClick={toggleReadOnly}
                        >
                            Edit 
                        </Button>
                        :
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
                                Update 
                            </Button>
                        </>
                    }
                </Grid>
            </Grid>
            <Grid container className="mt-30">
                <Grid item md={6}>
                    <Grid container className="form-field" justify="space-between">
                        <Grid item md={5}>
                            <TextField
                                required 
                                fullWidth
                                disabled
                                name="userId" 
                                label="User Id"
                            />
                        </Grid>
                        <Grid item md={5}>
                            <TextField 
                                required 
                                fullWidth
                                disabled={readOnly}
                                name="firstName"
                                label="First Name"
                            />
                        </Grid>
                    </Grid>
                    <Grid container className="form-field" justify="space-between">
                        <Grid item md={5}>
                            <TextField
                                required 
                                fullWidth
                                disabled={readOnly}
                                name="middleName" 
                                label="Middle Name"
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
                                name="fathersName" 
                                label="Father's Name"
                            />
                        </Grid>
                        <Grid item md={5}>
                            <TextField 
                                required 
                                fullWidth
                                disabled={readOnly}
                                name="mothersName"
                                label="Mother's Name"
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
    )
}

const formConfig = withFormik({
    displayName: 'Personal Details',

    mapPropsToValues: ({student}) => ({
        userId: student.userId,
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        email: student.email,
        contactNo: student.contactNo,
        address: student.address,
        fathersName: student.fathersName,
        mothersName: student.mothersName
    }),

    validationSchema: yup.object().shape({
        firstName: yup.string().required().label('First Name'),
        middleName: yup.string().label('Middle Name'),
        address: yup.string().required().label('Address'),
        contactNo: yup.string().length(10).matches(/[0-9]*/).required().label('Contact Number'),
        email: yup.string().email().required().label('Email'),
        lastName: yup.string().required().label('lastName Name'),
        fathersName: yup.string().required().label('Father\'s Name'),
        mothersName: yup.string().required().label('Mother\'s Name')
    }),

    handleSubmit: (values, formikBag) => {
        const { student, toggleReadOnly } = formikBag.props
        api.patch(`api/students/${student.id}`, values).then(res => {
            toggleReadOnly()
        })
        .catch(err => console.log(err))
    }
})

export default formConfig(PersonalDetailsForm)