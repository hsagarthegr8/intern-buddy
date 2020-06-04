import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { Edit } from '@material-ui/icons'

import { withFormik } from 'formik'
import * as yup from 'yup'

const PersonalDetailsForm = props => {
    const { readOnly } = this.props
    return (
        <Grid container justify="space-between" className="mt-30">
            <Typography variant="h6">Personal Details</Typography>
            <Grid item>
                {readOnly ?
                <Button 
                    color="primary" 
                    variant="contained" 
                    startIcon={<Edit />}
                    >
                        Edit 
                    </Button>
                    :
                    null
                }
                </Grid>
            
        </Grid>
    )
}

export default withFormik(PersonalDetailsForm)