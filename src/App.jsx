import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { Login, Dashboard, Student, OrganizationList, Profile, Organization } from './Pages'
import { Header } from './Components'

import theme from './theme'
import OrganizationForm from './Pages/Organization/OrganizationForm'

class App extends Component {
    state = { isLoggedIn: true,
        username: 'Swati',
        profile:{
            firstName: 'Swati',
            lastName: 'Deora',
            email: 'sdeora@gmail.com',
            contactNo: '9090909090',
            address: 'Delhi'
        }
    }

    handleLogIn = () => {
        this.setState({
            isLoggedIn: true,
            username: 'Himanshu',
            profile:{
                firstName: 'Swati',
                lastName: 'Deora',
                email: 'sdeora@gmail.com',
                contactNo: '9090909090',
                address: 'Delhi'
            }
        })
    }

    render () {
        const { isLoggedIn, username, profile } = this.state
        return (
            <Router>
                <ThemeProvider theme={theme}>
                <CssBaseline />
                {isLoggedIn ? (
                    <div className="page">
                        <Header username={username}/>
                        <div className="main">
                        <Switch>
                            <Route exact path="/"><Dashboard /></Route>
                            <Route exact path="/student"><Student/></Route>
                            <Route exact path="/organizations"><OrganizationList /></Route>
                            <Route exact path="/profile"><Profile profile={profile}/></Route>
                            <Route exact path="/organizations/:orgId"><Organization /></Route>
                            <Route exact path="/organization/add"><OrganizationForm /></Route>
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