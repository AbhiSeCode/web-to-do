/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Task} from './Task'
import {AddItem} from './AddItem'
import Cookies from 'js-cookie'
import firebase from 'firebase'
import { Loading } from './Loading'
import Swal from 'sweetalert2'

export const Dashboard = () => {

    const history=useHistory()
    const [data, setData]= useState()
    const [isClicked, setIsClicked] = useState(false)

    const getData =async () =>{
        const uid= Cookies.get('uid')
        firebase.database().ref(`users/${uid}/tasks`).on('value',(snapshot)=>{
                let temp= []
               snapshot.forEach((childData)=>{
                    temp =[{id: childData.key, name: childData.val().name}, ...temp]
               })
               setData(temp)
       })
    }

    const logout = ()=>{
        Cookies.remove('uid')
        history.push('/')
    }
    
    useEffect(()=>{
        if(!Cookies.get('uid')){
            history.push('/')
        }else{
            getData()
        }
    },[])

    useEffect(()=>{
        if(data){
            if(data.length === 1){
                Swal.fire({
                icon: 'info',
                titleText: 'You need to slide task to the left or to the right to delete it'
                })
            }         
        }
        setIsClicked(false)
    },[data])

    if(!data){
        return <Loading/>
    }
    else{
    return (
        <>
            <header className="header">
                <h1>Your To-Dos</h1>
                <button onClick={()=>logout()} className="logout-button">Logout</button>
            </header>
            {data.length === 0 && <p className="page-para">Create your first to-do now, by just clicking on plus sign</p>}
            <div className="tasks">
                {data.map((list)=>{
                    return <Task key={list.id} list={list}/>
                })}
            </div> 
            {isClicked && <AddItem setData={setData}/>}
            <button 
            className="add-button" 
            onClick={()=>setIsClicked(!isClicked)}>
                <img className={isClicked ?"addImage rotateImage" : "addImage"} 
                alt="plus sign" 
                src="plus.svg"/>
            </button>
        </> 

    )
    }
}