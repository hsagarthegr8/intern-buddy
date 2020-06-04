import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import api from '../../api'
import { Paper, Typography, Grid, Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import PersonalDetailsForm from './PersonalDetailsForm'
import AcademicDetailsForm from './AcademicDetailsForm'

class Student extends Component {

    state = {
        personalDetailsReadOnly: true,
        academinDetailsReadOnly: true
    }

    togglePersonalDetailsReadOnly = () => {
        this.setState(prevState => ({
            personalDetailsReadOnly: !prevState.personalDetailsReadOnly
        }))
    }

    toggleAcademicDetailsReadOnly = () => {
        this.setState(prevState => ({
            AcademicDetailsReadOnly: !prevState.AcademicDetailsReadOnly
        }))
    }

    componentDidMount() {
        const { params } = this.props.match
        api.get(`api/students/${params.sid}`).then(res => {
            this.setState({
                student: res.data.student
            })
        })
    }

    render() {
        const { student, personalDetailsReadOnly, academinDetailsReadOnly } = this.state
        return (
            <Paper className="p-30">
                {student && 
                <>
                    <Grid container justify="space-between">
                        <Typography variant="h5">{student.userId}</Typography>
                        
                        <Grid item>
                            <Button
                            color="primary" 
                            variant="contained" 
                            startIcon={<Delete />}
                            onClick={this.onDelete}
                            >
                                Delete 
                            </Button>
                        </Grid>
                    </Grid>
                    <PersonalDetailsForm 
                        student={student} 
                        readOnly={personalDetailsReadOnly} 
                        toggleReadOnly={this.togglePersonalDetailsReadOnly}
                    />
                    <AcademicDetailsForm 
                        student={student} 
                        readOnly={academinDetailsReadOnly}
                        toggleReadOnly={this.toggleAcademicDetailsReadOnly}
                    />
                </>
                }
            </Paper>
        )
    }
}

export default withRouter(Student)