import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { Login, Dashboard, Student, OrganizationList, Profile, Organization, StudentList, AddStudent } from './Pages'
import { Header } from './Components'

import * as jwt from 'jsonwebtoken'

import theme from './theme'


const accessTokenSecret = 'youraccesstokensecret';

class App extends Component {
    state = { 
        isLoggedIn: false
    }

    handleLogIn = (body) => {
        jwt.verify(body.token, accessTokenSecret, (err, payload) => {
            const { role } = payload
            const { user } = body
            delete user.password
            user.role = role
            this.setState({
            isLoggedIn: true,
            token: body.token,
            user
        })
        })
    }

    render () {
        const { isLoggedIn, user } = this.state
        return (
            <Router>
                <ThemeProvider theme={theme}>
                <CssBaseline />
                {isLoggedIn ? (
                    <div className="page">
                        <Header user={user}/>
                        <div className="main">
                        <Switch>
                            <Route exact path="/"><Dashboard /></Route>
                            <Route exact path="/students"><StudentList/></Route>
                            <Route exact path="/student/add"><AddStudent /></Route>
                            <Route exact path="/organizations"><OrganizationList /></Route>
                            <Route exact path="/profile"><Profile profile={user}/></Route>
                            <Route exact path="/organizations/:orgId"><Organization /></Route>
                            <Route exact path="/organization/add"><Organization addMode /></Route>
                            <Route><Redirect to='/' /></Route>
                        </Switch>
                        </div>
                    </div>
                ) : (
                    <Route><Login onLogin={this.handleLogIn}/></Route>
                )
                }
                </ThemeProvider>
            </Router>
        )

    }
} 
export default App