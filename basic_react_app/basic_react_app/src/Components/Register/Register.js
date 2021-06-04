import axios from "axios";
import React, {useState} from "react"
import "./Register.css";
import { NavLink } from "react-router-dom";

const Register = ()  => {
    const [inputs, setInputs] = useState({
        EmailId: "",
        Username: "", 
        Password: "",
        ConfirmPassword: "",
        Post:{
            title: "",
            content: ""
        }
    });

    const handleInput = (event) => {
        setInputs(inputs => ({...inputs, [event.target.name]:[event.target.value]}));
    }   

    return(
        <div>
            <ul id="subhead">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/myblog">Social</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="#">About Us</NavLink></li>
            </ul>
            <div className="container regblock">
               <form onSubmit = {register}>
                    <div class="mb-3">
                        <label className="form-label">Email address*</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="EmailId" placeholder="Enter Email ID" value={inputs.EmailID} onChange={handleInput} 
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$" required />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div class="mb-3">
                        <label className="form-label">Username*</label>
                        <input type="text" className="form-control" id="username" name="Username" placeholder="Enter Username" value={inputs.Username} onChange={handleInput} required />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div class="mb-3">
                        <label className="form-label">Password*</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="Password" placeholder="Enter Password" value={inputs.Passoword} onChange={handleInput} 
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}" title="Must contain atleast one number and one upercase and one lowercase letter, and atleast 4 characters" required />
                    </div>
                    <div class="mb-3">
                        <label className="form-label">Confirm Password*</label>
                        <input type="password" className="form-control" id="exampleConfirmPassword2" name="ConfirmPassword" placeholder="Confirm Password" value={inputs.ConfirmPassword} onChange={handleInput} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <NavLink className="nav-link" to="/login"> I am already registered</NavLink>
            </div>
        </div>
    );
}

const register = (e) => {
    e.preventDefault();
    let requests = {
        EmailId: document.getElementById("exampleInputEmail1").value,
        Username: document.getElementById("username").value,
        Password: document.getElementById("exampleInputPassword1").value,
        ConfirmPassword: document.getElementById("exampleConfirmPassword2").value
    }
    
    if(requests.Password != requests.ConfirmPassword){
        alert("Passwords do not match");
    }
    else{
        axios.post("/registerUser", requests)
        .then(res => {
            alert(res.data.message);
            if(res.status == 201){
                window.location = "/register";
            }
            else if(res.status == 200){
                window.location = "/login";
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export default Register;
