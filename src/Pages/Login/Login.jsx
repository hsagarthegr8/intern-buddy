import React from 'react'
import { Grid, Paper,  Button } from '@material-ui/core'
import LoginForm from './LoginForm'

const LoginPage = props => {
    return (
        <Grid container className="h-100">
            <Grid item md={8}></Grid>
            <Grid item md={4} className='h-100'>
                <Paper elevation={2} className='h-100 p-30'>
                    <Grid container className='h-100' direction="column" justify="space-around">
                        <Grid item>
                            <LoginForm {...props}/>
                        </Grid>

                        <Grid item>
                            <Button 
                                fullWidth
                                variant="outlined"
                                color="secondary"
                            >
                                New Admin? Register Here
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default LoginPage