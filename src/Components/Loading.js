import React from 'react'

export const Loading = () =>{
    return (
        <div className="modal">
            <div className="modal-loading">
                <img className="loading-gif" src="/loading.svg" alt="loading"/>
            </div>
        </div>
    )
}