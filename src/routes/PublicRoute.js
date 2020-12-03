import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {isUserLogin} from '../utils/checkUser'

export const PublicRoute = ({props, Component})=>{
    return (
        <Route {...props}>
            {!isUserLogin()?<Component/>: <Redirect to="/dashboard"/>}
        </Route>
    )
} 