import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'
import api from '../../api';
import OrganizationForm from './OrganizationForm';

class Organization extends Component {
    state = {
        organization: null,
        readOnly: true
    }

    componentDidMount() {
        const { params } = this.props.match
        const { addMode } = this.props
        if (addMode) {
            this.setState({
                readOnly: false
            })
            return;
        }
        api.get(`/api/organizations/${params.orgId}`).then(res => {
            this.setState({organization: res.data.organization})
        })
    }

    toggleReadOnly = () => {
        this.setState(prevState => ({
            readOnly: !prevState.readOnly
        }))
    }

    render() {

        const { organization, readOnly } = this.state
        const { addMode, user: {role} } = this.props

        if (addMode) {
            return  (
                <OrganizationForm 
                    role = {role}
                    readOnly={readOnly} 
                    toggleReadOnly={this.toggleReadOnly}
                />
            )
        }

        return (
            organization && 
            <OrganizationForm 
                role={role}
                organization={organization} 
                readOnly={readOnly} 
                toggleReadOnly={this.toggleReadOnly}
            />
        )
    }
}

export default withRouter(Organization)