import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import "./MyBlog.css";
import moment from "moment";
import { NavLink } from "react-router-dom";

const MyBlog = () => {
    const [blogdata, setBlogdata] = useState();
    var lst = []
    const [post, setPost] = useState({
        title: "",
        content: ""
    })
    
    const callpostPage = async() => {
        const allpost = await axios.get("/allpost")
        allpost.data.map((item) => {
            item.userPost.map(e => {
               lst.push([e.title, item.Username, e.created_at, e.content])
            })
            return lst
        })
        lst.sort((a,b) => new Date(b[2]).getTime() - new Date(a[2]).getTime());
        setBlogdata(lst)
    }
    
    useEffect(() => {
        callpostPage();
    }, [])
    console.log(blogdata);
    const handleChange = (e) => {
        setPost({...post, [e.target.name]: [e.target.value],});
    }

    const handlePost = (e) => {
        e.preventDefault();
        let req = {
            title: document.getElementById("title").value,
            content: document.getElementById("content").value
        }
        if (!req.title.trim()) {
            alert("Please fill all the fields");
        }
        else if (!req.content.trim()) {
            alert("Please fill all the fields");
        }
        else {
            axios.post("/post", req)
            .then(res => {
                if(res.status === 200) {
                    alert("Posted!");
                    setPost({
                        title: "",
                        content: ""
                    })
                }
                else{
                    alert("Sorry! Try again");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }}

    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-6 col-lg-8">
                    <div className="block">
                        <p><NavLink id="back" to="/myaccount">Back</NavLink></p>
                        <h1 id="bloghead">Let's Talk☕☕</h1>
                        <div className="container">
                            {blogdata && blogdata.map((item, i) => {
                                    return(
                                        <div key={i} className="container posts">
                                            <p id="posttitle">{item[0]}</p>
                                            <p>By: {item[1]}, {moment(item[2]).format('MMMM Do YYYY H:mma')} </p>
                                            <p>{item[3]}</p>
                                            <br/>
                                            <br/>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 col-md-6 col-lg-4">
                    <div className="container">
                        <p id="intro">Share experiences about your work, your day and a lot more!</p>
                        <input id="title" name="title" type="text" className="form-control" placeholder="Title" value={post.title} onChange={handleChange} maxLength="50" />
                        <br/>
                        <textarea id="content" name="content" placeholder="Your Post" value={post.content} onChange={handleChange} maxLength="500" ></textarea>
                        <button type="submit" onClick={handlePost}>Add Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyBlog;
