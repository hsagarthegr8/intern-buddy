import React, { Component }  from 'react'
import api from '../../api'
import { Paper, Grid, Typography } from '@material-ui/core'
import OrgListItem from './OrgListItem'

class OrganizationList extends Component {
    state = {
        organizations: []
    }

    componentDidMount() {
        api.get('/api/organizations/').then(res => {
            this.setState({organizations: res.data.organizations})
        })
    }

    render() {
        const { organizations } = this.state
        return (
            <Paper className="p-30" style={{minHeight: 400}}>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography variant="h6">Organizations</Typography>
                    </Grid>
                </Grid>

                <Grid container direction className="mt-30">
                    {organizations.map(org => (
                        <Grid item md={3} key={org.id} >
                        <OrgListItem organization={org} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        )
    }
}

export default OrganizationList