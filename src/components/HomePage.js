import React, { useState } from "react";
import "./style.css";
import { Form } from "semantic-ui-react";
import TasksDisplay from "./TasksDisplay";
import axios from 'axios'

const HomePage = () => {

    let currentId, taskDone;
    const [task, setTask] = useState('');
    const [currenttask,setCurrentTask] = useState('');

    // Add Task
    const addTask = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/todos',{todos:task,taskDone:false})
        .then((response)=> {
            alert("Data added successfully")
            setTask('')
        })
        .catch((error)=> console.log("Error: " + error.message))
    }

    // Edit Task
    const editTask = (id) => {
        currentId = id;
        axios.get(`http://localhost:4000/todos/${id}`)
            .then((response) => {
                taskDone = response.data.taskDone
                setTask(response.data.todos)
                setCurrentTask(response.data)
            })
            .catch((error) => { console.log(error.response.data.message) })
            
        document.getElementById("add-btn").disabled = true;
        document.getElementById("update-btn").disabled = false;
    } 

    // Update Task
    const updateTask = () => {
        console.log(currenttask)
        currentId= currenttask.id;
        taskDone = currenttask.taskDone;
        axios.put(`http://localhost:4000/todos/${currentId}`,{todos:task,taskDone})
        .then((response) => {
            setTask('')
            alert("Task updated successfully")
        })
        .catch((error) => { console.log(error) })
        document.getElementById("add-btn").disabled = false;
        document.getElementById("update-btn").disabled = true;
    }

    return (
        <div className="body-container" data-bs-theme="dark">
            <div className="header">
                <div className="container list-container">
                    <h2>My Tasks</h2>
                    <Form onSubmit={addTask}>
                        <Form.Group>
                            <Form.Input
                                width={7}
                                placeholder="Add Task"
                                name="task"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                            />
                            <Form.Button content="Add" id="add-btn"/>
                            <Form.Button content="Update" id="update-btn"  onClick={updateTask}/>
                        </Form.Group>
                    </Form>
                    <TasksDisplay callBack={editTask}/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
