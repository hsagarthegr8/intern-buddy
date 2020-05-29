import React from 'react'
import { useFormikContext } from 'formik'

import { FormControlLabel, Switch as Input} from '@material-ui/core'

const Switch = props => {
    const { name } = props
    const { values, handleBlur, handleChange} = useFormikContext()

    return (
        <FormControlLabel 
            {...props} 
            value={values[name]} 
            onChange={handleChange}
            onBlur={handleBlur}
            control={<Input />}
        />
    )
}

export default Switch