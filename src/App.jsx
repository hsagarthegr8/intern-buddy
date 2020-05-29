import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { Login, Dashboard, Student, Organization, Profile } from './Pages'
import { Header } from './Components'

class App extends Component {
    state = { isLoggedIn: true,
        username: 'Himanshu',
        profileObj:{
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
            profileObj:{
                firstName: 'Swati',
                lastName: 'Deora',
                email: 'sdeora@gmail.com',
                contactNo: '9090909090',
                address: 'Delhi'
            }
        })
    }

    render () {
        const { isLoggedIn, username, profileObj } = this.state
        return (
            <Router>
                <CssBaseline />
                {isLoggedIn ? (
                    <div className="page">
                        <Header username={username}/>
                        <Switch>
                            <Route exact path="/"><Dashboard /></Route>
                            <Route exact path="/student"><Student/></Route>
                            <Route exact path="/organization"><Organization /></Route>
                            <Route exact path="/profile"><Profile profileObj={profileObj}/></Route>
                            <Route><Redirect to='/' /></Route>
                        </Switch>
                    </div>
                ) : (
                    <Route><Login onLogin={this.handleLogIn}/></Route>
                )
                }
            </Router>
        )

    }
} 
export default App