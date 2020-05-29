import React from 'react'
import {  Grid, } from '@material-ui/core'

const Profile = props => {
    const{firstName, lastName, email, contactNo, address} = props.profileObj
    return (
        <div>
            <Grid container>
                <Grid item sm={3}>
                    firstName
                </Grid>
                <Grid item sm={3}>
                    {firstName}
                </Grid>
            </Grid>
            <Grid container>
            <Grid item sm={3}>
                lastName
            </Grid>
            <Grid item sm={3}>
                {lastName}
            </Grid>
        </Grid>
        <Grid container>
            <Grid item sm={3}>
                email
            </Grid>
            <Grid item sm={3}>
                {email}
            </Grid>
        </Grid>
        <Grid container>
            <Grid item sm={3}>
                contactNo
            </Grid>
            <Grid item sm={3}>
                {contactNo}
            </Grid>
        </Grid>
        <Grid container>
            <Grid item sm={3}>
                address
            </Grid>
            <Grid item sm={3}>
                {address}
            </Grid>
        </Grid>
    </div>
    )
}

export default Profile