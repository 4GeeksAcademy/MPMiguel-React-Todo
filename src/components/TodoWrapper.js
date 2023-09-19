import React, { useState,useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from 'uuid';
import { Todo } from "./Todo";

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);


    const URL = "https://playground.4geeks.com/apis/fake/todos/user/mpmiguel"
    const getTodos = () => {
        return fetch(URL)
          .then((res) => {
            if (!res.ok) {
              throw Error();
            }
            return res.json();
          })
          .then((res) => {
            return Array.isArray(res) ? res : []; // Ensure it's an array
          })
          .catch((err) => {
            console.log(err);
            return []; // Return an empty array on error
          });
      }
      

    useEffect(() => {
        const llamarGetTodos = () => {
        getTodos().then((data) => setTodos(data));
        };
        llamarGetTodos();
      }, []);

      const modifyTodos = async (todos) =>  
      { return fetch(URL, {
            method: "PUT",
            body: JSON.stringify(todos),
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(resp => {
              console.log(resp.ok);
              console.log(resp.status); 
              console.log(resp.text()); 
              return (resp)
          })
          .catch(error => {
            
              console.log(error);
          })}

          const addTodo = (todo) => {
            if (todo.trim() !== "") {
                const objInput = { id: uuidv4(), task: todo, completed: false };
                setTodos([...todos, objInput]);
                modifyTodos([...todos, objInput]);
                
            }
        }
        

    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
        
    }
    const deleteTodo = id => {
       const cleanTodos = todos.filter(todo => todo.id !== id)
         modifyTodos([cleanTodos]);
         setTodos(cleanTodos)
    }

    // const itemsLeft = todos.filter(todo => !todo.completed).length;

    return (<>
        <p className="title">Todos</p>
        <div className='TodoWrapper'>

            <TodoForm addTodo={addTodo} />
            {todos.map((todo, index) => (
                <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
            ))}
            <hr className="solid"></hr>
            {/* <p className="items-left">{itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left</p> */}
        </div>
    </>
    )
}
