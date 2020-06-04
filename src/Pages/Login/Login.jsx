import React, { Component }  from 'react'
import { Grid, Paper, Button, Typography } from '@material-ui/core'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class LoginPage extends Component {
    state = {
        newUser: false
    }

    toggleNewUser = () => {
        this.setState(prevState => ({
            newUser: !prevState.newUser
        }))
    }

    render() {
        const { newUser } = this.state
        return (
            <Grid container className="h-100">
                <Grid item md={8}></Grid>
                <Grid item md={4} className='h-100'>
                    <Paper elevation={2} className='h-100 p-30'>
                        <Grid container className='h-100' direction="column" justify="space-between">
                            <Typography variant="h5" color="primary"> Intern Buddy </Typography>
                            <Grid item>
                                {newUser ? <RegisterForm onRegister={this.toggleNewUser}/> : <LoginForm {...this.props}/>}
                            </Grid>

                            <Grid item>
                                <Button 
                                    fullWidth
                                    variant="outlined"
                                    color="secondary"
                                    onClick={this.toggleNewUser}
                                >
                                    {newUser ? 
                                    'Already Registered ? Login Here' : 
                                    'New Admin? Register Here'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default LoginPage