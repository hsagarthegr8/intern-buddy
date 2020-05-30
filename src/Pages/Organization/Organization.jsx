import React, { Component } from 'react';

import { Paper, Grid, Typography, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import api from '../../api';
import OrganizationForm from './OrganizationForm';

class Organization extends Component {
    state = {
        organization: null
    }

    componentDidMount() {
        const { params } = this.props.match
        api.get(`/api/organizations/${params.orgId}`).then(res => {
            this.setState({organization: res.data.organization})
        })
    }

    render() {

        const { organization } = this.state

        return (
            
                organization && <OrganizationForm organization={organization} />
            
        )
    }
}

export default withRouter(Organization)