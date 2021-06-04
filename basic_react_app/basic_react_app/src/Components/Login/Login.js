import React, {useEffect, useState} from "react"
import "./Login.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Login = ()  => {
    
    const [fields, setFields] = useState({
        EmailId: "",
        Password: ""
    });

    const handleFields = (event) => {
        setFields(fields => ({...fields, [event.target.name]:[event.target.value]}));
    }
    
    return(
        <div> 
            <ul id="subhead">
                <li><NavLink to ="/">Home</NavLink></li>
                <li><NavLink to="/myblog">Social</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="#">About Us</NavLink></li>
            </ul>
            <div className="container logblock">
                <form onSubmit={login}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" name="EmailId" placeholder="Enter Email ID" value={fields.EmailId} onChange={handleFields} required />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword" name="Password" placeholder="Enter Password" value={fields.Password} onChange={handleFields} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <br/>
                    <br/>
                </form>
                <NavLink className="nav-link" to="/register">Create an account</NavLink>
            </div>
        </div>
    );
}

const login = (e) => {
    e.preventDefault();
    let request = {
        EmailId: document.getElementById("exampleInputEmail").value,
        Password: document.getElementById("exampleInputPassword").value
    }
    axios.post("/loginUser", request)
    .then(res => {
        alert(res.data.message);
        if (res.status === 201){
            window.location = "/myaccount";
        }
    })
    .catch(err => {
        console.log(err);
    })
}

export default Login;
