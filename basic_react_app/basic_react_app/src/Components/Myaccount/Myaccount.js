import React, {useState, useEffect} from "react";
import { NavLink, useHistory } from "react-router-dom";
import Todo from "../Todo/Todo.js";
import Notes from "../Notes/Notes.js";
import Calenders from "../Calenders/Calenders.js";
import "./Myaccount.css";
import axios from "axios";

const Myaccount = () => {
    
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [newshow, setNewshow] = useState(false);
    const [calshow, setCalshow] = useState(false);
    const [name, setName] = useState();

    const callpostPage = async() => {
        await axios.get("/myblog")
        .then(res => {
            console.log("hello");
            if(res.status === 200){
                setName(res.data.Username)
            }
        }).catch((error) => {
             history.push("/login");
        }) 
    }

    useEffect(() => {
        callpostPage();
    }, [])
    
    const handleTodolist = (event) => {
        event.preventDefault();
        setShow(!show);
    }

    const handleNotes = (event) => {
        event.preventDefault();
        setNewshow(!newshow);
    }

    const handleCalender = (event) => {
        event.preventDefault();
        setCalshow(!calshow);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        axios.get("/logout", {withCredentials: true})
        .then(res => {
            if (res.status === 200){
                alert(res.data.message);
                window.location = "/login"
            }
            else {
                alert("There is some error");
            }
        })
    }
    
    return(
        <div className="container-fluid">
            <ul>
                <li className="list"><span id="tag">Hello, {name}</span></li>
                <li className="list"><NavLink to="/myblog" onClick={handleBlog}>Social</NavLink></li>
                <li className="list"><button onClick ={handleTodolist}>Todo List</button></li>
                <li className="list"><button onClick ={handleNotes}>Notes</button></li>
                <li className="list"><button onClick ={handleCalender}>Calender</button></li>
                <li className="list"><button onClick={handleLogout}>Log out</button></li>
            </ul>
            <div className="row">
                <div className="col-sm-3">{show ? <Todo /> : null}</div>
                <div className="col-sm-3">{newshow ? <Notes /> : null}</div>
                <div className="col-sm-3">{calshow ? <Calenders /> : null}</div>
            </div>
        </div>
    );
}

const handleBlog = (e) => {
    e.preventDefault();
    var loggedin = null;
    axios.get("/myblog")
    .then(res => {
        if (res.status == 200) {
            loggedin = "blog"
            window.location = `/MyBlog?loggedin=${loggedin}`;
        }
        else {
            alert("You need to Login")
            window.location = "/login";
        }
    })
}
   
export default Myaccount;
