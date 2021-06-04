import React from "react"
import "./Home.css"
import { NavLink } from "react-router-dom";

const Home = ()  => {
    
    return(
        <div>
            <ul id="subhead">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/myblog">Social</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="#">About Us</NavLink></li>
            </ul>
            <div id="home">
                <h1 id="heading"><i>Welcome to My Desk</i></h1>
                <div id="para">
                    <i>Create your own personalized desk. Maintain a Todo List, write notes and many more.
                    <p>If New User, Click on Register to create your account. Already have an account, Login
                    and start!✏✏</p></i>
                </div>
            </div>
        </div>
    );
}

export default Home;
