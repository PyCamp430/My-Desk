import React, {useState} from "react"
import "./Todo.css"

const Todo = () => {
    const [tasks, setTasks] = React.useState("");
    const [items, setItems] = React.useState([]);
    
    const handleChange = (event) => {
        setTasks(event.target.value);
    }
    
    const addTask = (e) => {
        e.preventDefault();
        let tasklength = tasks.trim();
        if (tasklength.length !== 0) {
        setItems((oldItems) => {
            return [...oldItems, tasks];
        })
        setTasks("");}
    }

    const delTask = (index) => {
        setItems((oldItems) => {
            const newlst = [...oldItems]
            newlst.splice(index, 1);
            return(newlst);
        });
    }
    
    return(
        <div className="leftblock">
            <h3> My Todo List</h3>
            <input type="text" placeholder="Add Task" onChange={handleChange} value={tasks}/>
            <button className="stylebutton" onClick={addTask}><b>+</b></button>
            <br/>
            <ul>
                {items.map((item, i, id) => {
                    return(
                        <li key={i}>{item}<button className="stylebutton" onClick={() => {delTask(i)}}><b>X</b></button></li>
                    ); 
                })}
            </ul>
        </div>
    );
}   

export default Todo;
