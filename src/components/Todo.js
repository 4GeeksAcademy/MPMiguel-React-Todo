import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'





export const Todo = ({task,toggleComplete,deleteTodo}) => {

    return (<>
        <hr className="solid"></hr>
        <div className='Todo'>   
            <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed' : ""}`}>{task.task}</p>
            <div> 
                       <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
            </div>
            
        </div>
        
        </>
    )
}