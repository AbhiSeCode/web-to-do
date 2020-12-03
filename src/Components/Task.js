import React, { useState } from 'react'
import firebase from 'firebase'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import {motion} from "framer-motion"

export const Task = ({list}) => {

    const [toDelete, setToDelete] = useState(false)

    const onPan = (e, info, id) =>{
        if(info.offset.x <= -200|| info.offset.x >= 200){
            setToDelete(true)
            Swal.fire({
                title: 'Do you want to delete task?',
                showConfirmButton: true,
                confirmButtonText: 'Yes',
                showDenyButton : true,
            }).then((result)=>{
                setToDelete(false)
                if(result.isConfirmed){
                    Swal.fire({  position: 'top-end',
                        icon: 'success',
                        title: 'Deleted',
                        showConfirmButton: false,
                        timer: 1000,
                        width: 'auto'
                    })
                    .then(deleteTask(id))
                }
            })
        }
    }
    
    const deleteTask = async(id) =>{   
        await firebase.database().ref(`users/${Cookies.get('uid')}/tasks/${id}`).remove()
    }
    
    return (    
        <div className="task">
            <motion.p
            drag='x'
            dragDirectionLock
            dragConstraints={{ right: 0,left: 0 }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            onDirectionLock= {axis=> console.log(axis)}
            onPan={(e, info)=>onPan(e, info, list.id)}
            className={toDelete? "task-name deleting": "task-name"}>
                {list.name}
            </motion.p>
        </div>
    )
}
