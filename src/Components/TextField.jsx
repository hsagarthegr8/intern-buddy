import React from 'react'
import { useFormikContext } from 'formik'

import { TextField as Input, Typography, Grid } from '@material-ui/core'

const TextField = props => {
    const { name, disabled, label } = props
    const { values, touched, errors, handleBlur, handleChange} = useFormikContext()

    if (disabled) {
        return (
            <Grid container direction="column">
                <Typography variant="caption">{label}</Typography>
                <Typography>{values[name]}</Typography>
            </Grid>
        )
    }

    return (
        <Input 
            {...props} 
            value={values[name]} 
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched[name] && errors[name]}
            helperText={touched[name] && errors[name]}
        />
    )
}

export default TextField