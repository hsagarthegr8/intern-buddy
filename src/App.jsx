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

    handleLogout = () => {
        this.setState({
            isLoggedIn: false,
            token: undefined,
            user: {}
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
                        <Header user={user} onLogout={this.handleLogout}/>
                        <div className="main">
                        <Switch>
                            <Route exact path="/"><Dashboard user={user}/></Route>
                            <Route exact path="/organizations"><OrganizationList user={user}/></Route>
                            <Route exact path="/profile"><Profile profile={user}/></Route>
                            <Route exact path="/organizations/:orgId"><Organization user={user}/></Route>
                            {user.role === 'admin' && (
                                <>
                                <Route exact path="/organization/add"><Organization addMode /></Route>
                                <Route exact path="/students"><StudentList/></Route>
                                <Route exact path="/students/:sid"><Student /></Route>
                                <Route exact path="/student/add"><AddStudent /></Route>
                                </>
                            )
                            }
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