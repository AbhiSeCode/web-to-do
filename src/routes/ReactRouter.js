import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Dashboard } from '../Components/Dashboard'
import {Home} from '../Components/Home'
import {PrivateRoute} from './PrivateRoute'
import {PublicRoute} from './PublicRoute'

export const ReactRouter = () => {
    return (
        <Router>
            <Switch>
                <PublicRoute path="/" exact Component={Home}/>
                <PrivateRoute path="/dashboard" exact Component={Dashboard}/>
                <Route path="*">
                    <p className="page-para"> 404!! Page not found</p>
                </Route>
            </Switch>
        </Router>
    )
}
