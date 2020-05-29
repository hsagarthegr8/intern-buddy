import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const OrgListItem = ({organization}) => {
    return (
        <Link to={`organizations/${organization.id}`}>
        <Button fullWidth color="primary" variant="outlined" className="orglistitem">
            <Grid container direction="column">
                <Typography>{organization.organizationName}</Typography>
                <Typography variant="caption">
                <a  href={`https://${organization.organizationWebsite}`}>
                    {organization.organizationWebsite}
                </a>
                </Typography>
                <Typography variant="body2">
                    {organization.organizationAddress}, {organization.organizationCity}
                </Typography>
            </Grid>
        </Button>
        </Link>
    )
}

export default OrgListItem