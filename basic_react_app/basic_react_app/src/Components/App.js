import React from "react"
import {Redirect, Route, Switch} from "react-router-dom";
import "./App.css"
import Login from "./Login/Login.js";
import Register from "./Register/Register.js";
import Myaccount from "./Myaccount/Myaccount.js"
import Error from "./Error.js";
import Home from "./Home/Home.js";
import MyBlog from "./MyBlog/MyBlog.js"
 
const App = () => {
    const search = window.location.search; 
    const params = new URLSearchParams(search); 
    const loggedin =  params.get("loggedin"); 
    
    return(
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/myaccount" component={Myaccount} />
                <Route path="/MyBlog" render = {() => (loggedin ? (<MyBlog />) : (alert("You need to Login"), <Redirect to="/login" />))} />
                <Route component={Error} />
            </Switch>
        </div>
    );
}

export default App;