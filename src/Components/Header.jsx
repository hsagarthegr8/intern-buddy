import React from 'react'
import { AppBar, Toolbar, Grid, Typography, Button } from '@material-ui/core'

import { Link } from 'react-router-dom'

const Header = props => {
    const { username } = props
    return (
        <AppBar position="static" >
            <Toolbar variant="dense">
                <Grid container>
                    <Grid item>
                        <Link to='/'><Typography variant="h6" style={{color: 'white'}}>Intern Buddy</Typography></Link>
                    </Grid>
                    <Grid item xs />
                    <Grid>
                        <Typography display="inline" style={{marginRight: 10}}>Hi {username}</Typography>
                        <Button color="inherit">Logout</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header