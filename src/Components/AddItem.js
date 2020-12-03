import React,{useState} from 'react'
import Swal from 'sweetalert2'
import firebase from 'firebase'
import Cookies from 'js-cookie'

export const AddItem = ({setData}) =>{
    const [name, setName]= useState('')
    
    const addItem = async(e) =>{
        e.preventDefault()
        if(!name.trim()){
            Swal.fire({
                icon: 'warning',
                text: "Item Name can't be empty"
            })

        }else{
            firebase.database().ref(`users/${Cookies.get('uid')}/tasks/`).push({
                name
            })
            setName('') 
        }
    }

    return (
        <form className="new-task" onSubmit={addItem}>
            <input type="text" 
             id="taskName" 
             value={name} 
             placeholder="Create New To-Do Task" 
             autoComplete="off" 
             autoFocus
             onChange={(e)=>setName(e.target.value)}/>
            <button className="add-task">Add</button>
        </form>
    )
}
