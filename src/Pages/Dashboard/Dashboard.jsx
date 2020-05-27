import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { Section } from '../../Components'

class Dashboard extends Component {
    render() {
        return (
            <Grid container justify="space-around" style={{marginTop: 100}}> 
                <Link to='/student'> <Section title="Students" /> </Link>
                <Link to='/organization'><Section title="Organizations" /></Link>
                <Link to='/profile'><Section title="Profile" /></Link>
            </Grid>
        )
    }
}

export default Dashboard