import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const StudentListItem = ({student}) => {
    return (
        <Link to={`students/${student._id}`}>
        <Button fullWidth color="primary" variant="outlined" className="studentListItem">
            <Grid container direction="column">
                <Typography>{student.firstName} {student.lastName}</Typography>
                <Typography variant="caption">
                <a  href={`mailto:${student.email}`}>
                    {student.email}
                </a>
                </Typography>
                <Typography variant="body2">
                    {student.address}
                </Typography>
            </Grid>
        </Button>
        </Link>
    )
}

export default StudentListItem