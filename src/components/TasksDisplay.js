import React, { useEffect, useState } from "react";
import "./style.css";
import { Icon } from "semantic-ui-react";
import axios from "axios";

const TasksDisplay = ({ callBack }) => {

    const [taskList, setTaskList] = useState([]);
    let count = 0;

    useEffect(() => {
        axios.get('http://localhost:4000/todos')
            .then((response) => {
                setTaskList(response.data)
            })
            .catch((error) => { console.log(error.response.message) })
    }, [])

    const deleteTask = (id) => {
        axios.delete(`http://localhost:4000/todos/${id}`)
            .then(
                alert("Task deleted successfully")
            )
            .catch((error) => { console.log(error.response.message) })
    }

    const edit = (id) => {
        callBack(id);
    }

    const deleteCriteria = taskList.map(task => task.id)

    const clearAll = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:4000/todos/`)
            .then((response) => {
                // setTaskList([])
            })
            .catch(err => console.log(err))
    }


    // If CheckBox id checked
    const taskDone = (event,id,todos,count) => {
        if (event.target.checked) {

            document.getElementsByClassName("tasksLabel")[count].style.textDecoration = "line-through";
            document.getElementsByClassName("edit-icon-btn")[count].style.visibility = "hidden"
            axios.put(`http://localhost:4000/todos/${id}`,{todos,taskDone:true})
            .then()
            .catch((error) => { console.log(error.message) })
        } else if (!event.target.checked){
            debugger
            document.getElementsByClassName("tasksLabel")[count].style.textDecoration = "none"
            document.getElementsByClassName("edit-icon-btn")[count].style.visibility = "visible"
            axios.put(`http://localhost:4000/todos/${id}`,{todos,taskDone:false})
            .then()
            .catch((error) => { console.log(error.message) })
        }

    }
    return (
        <div className="list-display">
            <div className="list-header">
                <p className="task-count">{taskList.length} tasks left</p>
                <button className="clear-btn" onClick={clearAll}>Clear all tasks</button>
            </div>
            <hr style={{ margin: "0" }} />
            <div className="list-body">
                <form>
                    {
                        taskList.map((task,index) => {
                            if(task.taskDone ===  true){
                                return (
                                    <div className="row" key={task.id}>
                                        <div className="col-1">
                                            <input type="checkbox" className="checkBox-class "name="" onChange={(e)=>taskDone(e,task.id,task.todos,index)}  checked/>
                                        </div>
                                        <div className="col-9">
                                            <label className="tasksLabel" style={{textDecoration:"line-through"}}>{task.todos}</label>
                                        </div>
                                        <div className="col-1">
                                            <button type="submit" className="edit-icon-btn icon-btn" hidden>
                                                <Icon name="edit" color="grey" />
                                            </button>
                                        </div>
                                        <div className="col-1" style={{ paddingBottom: "15px" }}>
                                            <button type="submit" className="del-icon-btn icon-btn" onClick={() => deleteTask(task.id)}>
                                                <Icon name="delete" color="grey" />
                                            </button>
                                        </div>
                                        <hr style={{ margin: "0", width: "-webkit-fill-available" }} />
                                    </div>
                                )
                            }
                            else{
                                return (
                                    <div className="row" key={task.id}>
                                        <div className="col-1">
                                            <input type="checkbox" className="checkBox-class" name="" onChange={(e)=>taskDone(e,task.id,task.todos,index)}/>
                                        </div>
                                        <div className="col-9">
                                            <label className="tasksLabel">{task.todos}</label>
                                        </div>
                                        <div className="col-1">
                                            <button type="submit" className="edit-icon-btn icon-btn" onClick={(e) => { e.preventDefault(); edit(task.id) }}>
                                                <Icon name="edit" color="grey" />
                                            </button>
                                        </div>
                                        <div className="col-1" style={{ paddingBottom: "15px" }}>
                                            <button type="submit" className="icon-btn" onClick={() => deleteTask(task.id)}>
                                                <Icon name="delete" color="grey" />
                                            </button>
                                        </div>
                                        <hr style={{ margin: "0", width: "-webkit-fill-available" }} />
                                    </div>
                                )
                            }
                        })
                    }
                </form>
            </div>
        </div>
    );
};

export default TasksDisplay;
