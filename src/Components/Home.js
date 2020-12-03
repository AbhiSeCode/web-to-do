/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {Form} from './Form'
import {Info} from './Info'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'

export const Home = () => {
    const history = useHistory()
    useEffect(()=>{
        if(Cookies.get('uid')){
            history.push('/dashboard')
        }
    },[])
    return (
        <>
            <header className="header">
                <h1>Welcome to the Web To-Do</h1> 
            </header>
            <section className="page-section">
                <Info/>
                <Form/>
            </section>
        </>
    )
}
