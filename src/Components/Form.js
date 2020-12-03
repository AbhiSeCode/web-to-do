import React,{useState} from 'react'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import {firebaseSignup, firebaseSignin} from '../firebase/firebase'
// import firebase from 'firebase'

import {useHistory} from 'react-router-dom'

export const Form = () => {

    const histroy= useHistory()
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword]= useState('')
    const [formType, setFormType] = useState('login')
    const [active, setActive] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const handleForm = async (e) =>{
        e.preventDefault()
        console.log('hehe')
        if(!formType){
            Swal.fire({
                icon: 'error',
                title: 'Opps!!',
                text: "This is unusual"
            })
        }
        else if(formType==="signup"){ 
            setIsLoading(true)  
            if(password.localeCompare(confirmPassword)===0){
                await firebaseSignup(email,password)
                    .then((user) => {
                        setIsLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Welcome to Web To-Do',
                            text: "Let's create some tasks now."
                        })
                        Cookies.set('uid', user.user.uid)
                        histroy.push('/dashboard')
                    })
                    .catch((error) => {
                        setIsLoading(false)
                        Swal.fire({
                            icon: 'error',
                            text: error.message
                        })
                    })
                    setEmail('')
                    setPassword('')
                    setConfirmPassword('')
            }
            else{
                setIsLoading(false) 
                Swal.fire({
                    icon: 'warning',
                    text: "Passwords Don't match"
                })
                setPassword('')
                setConfirmPassword('')
            }
        }     
        else{
            setIsLoading(true)
           await firebaseSignin(email,password)
           .then((user) => {
                setIsLoading(false)  
                Cookies.set('uid', user.user.uid)
                histroy.push('/dashboard')
            })
            .catch((error) => {
                setIsLoading(false)
                Swal.fire({
                icon: 'error',
                text: error.message
                })
            })
            setEmail('')
            setPassword('')
        }
    }
    const changeForm = (e,type) =>{
        e.preventDefault()
        setFormType(type)
        setActive(!active)
    }
    return (<>
        <form className="form" onSubmit={handleForm}>
            <div className="form-buttons">
                <button value="login"
                 disabled={active} 
                 type="button"
                 className={active ?"form-button active": "form-button"} 
                 onClick={(e)=>changeForm(e, e.target.value)}>
                    Login
                </button>
                <div className="line"></div>
                <button value="signup"
                 disabled={!active}
                 type="button" 
                 className={active?"form-button": "form-button active"} 
                 onClick={(e)=>changeForm(e, e.target.value)}>
                    Signup
                </button>
            </div>
            <div className="form-content">
                <label htmlFor="email">Email:</label>
                <input type="email"
                 id="email" 
                 required 
                 placeholder="Your Email ID" 
                 value={email} 
                 onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-content">
                <label htmlFor="password">Password:</label>
                <input type="password"
                 id="password" 
                 required 
                 placeholder="Your Password" 
                 value={password} 
                 onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            {formType === 'signup' &&<div className="form-content">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password"
                 id="confirmPassword" 
                 required 
                 placeholder="Confirm Your Password" 
                 value={confirmPassword} 
                 onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>}
                {isLoading && <div className="modal-loading">
                        <img src="/loading.svg" alt="loading" className="loading-gif"/>
                </div>}
            <button className="auth" type="submit">
                {formType ==="signup"? "Sign Up": "Log In"}
            </button>
        </form>
        </>
    )
}
