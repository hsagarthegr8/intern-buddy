import React, { Component }  from 'react'
import api from '../../api'
import { Paper, Grid, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Add } from '@material-ui/icons'
import StudentListItem from './StudentListItem'

class StudentList extends Component {
    state = {
        students: []
    }

    componentDidMount() {
        api.get('/api/students/').then(res => {
            this.setState({students: res.data.students})
        })
    }

    render() {
        const { students } = this.state
        return (
            <Paper className="p-30" style={{minHeight: 400}}>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography variant="h6">Students</Typography>
                    </Grid>
                    <Grid item>
                        <Link to='/student/add'>
                            <Button
                                color="primary" 
                                variant="contained" 
                                startIcon={<Add />}
                                onClick={this.toggleReadOnly}
                            >
                                Add Student 
                            </Button>
                        </Link>
                    </Grid>
                </Grid>

                <Grid container direction className="mt-30">
                    {students.map(student => (
                        <Grid item md={3} key={student.id} style={{padding:15}} >
                        <StudentListItem student={student} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        )
    }
}

export default StudentList