import React from 'react'
import { Button, Typography } from '@material-ui/core'

const Section = props => {
    const { title } = props 
    return (
        <Button variant="outlined" color="secondary" className="section">
            <Typography variant="h6" style={{textTransform: 'none'}}>{title}</Typography>
        </Button>
    )
}

export default Section