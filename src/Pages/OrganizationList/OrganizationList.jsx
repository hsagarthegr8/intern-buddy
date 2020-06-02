import React, { Component }  from 'react'
import api from '../../api'
import { Paper, Grid, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import OrgListItem from './OrgListItem'
import { Add } from '@material-ui/icons'

class OrganizationList extends Component {
    state = {
        organizations: []
    }

    componentDidMount() {
        api.get('/api/organizations/').then(res => {
            this.setState({organizations: res.data.organization})
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
                    <Grid item>
                        <Link to='/organization/add'>
                            <Button
                                color="primary" 
                                variant="contained" 
                                startIcon={<Add />}
                                onClick={this.toggleReadOnly}
                            >
                                Add Organization 
                            </Button>
                        </Link>
                    </Grid>
                </Grid>

                <Grid container direction className="mt-30">
                    {organizations.map(org => (
                        <Grid item md={3} key={org.id} style={{padding:15}} >
                        <OrgListItem organization={org} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        )
    }
}

export default OrganizationList