const express = require("express");
const app = express();
const port = PORT;
const path = require("path");
const cors = require("cors");
require("./Databases/Conn.js");
const Registertable = require("./Models/registermodels");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

const static_path = path.join(__dirname, "../basic_react_app/src/Components/index");
app.use(express.static(static_path));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.get("/myblog", auth, (request, response) => {
    try{
        return response
    }catch(error) {
        console.log(error);
    }
});

app.post("/registerUser", async (req, res) => {
    try{
        const EmailId = req.body.EmailId;
        const Username = req.body.Username;
        const Password = req.body.Password;
        const ConfirmPassword = req.body.ConfirmPassword;
        const title = "";
        const content = "";

        const Useremailexist = await Registertable.findOne({EmailId: EmailId});
        if(Useremailexist){
            return res.status(201).send({message: "Email already exists"});
        }
        
        const newUser = new Registertable({
            EmailId : req.body.EmailId,
            Username : req.body.Username,
            Password : req.body.Password,
            ConfirmPassword : req.body.ConfirmPassword
        })
        await newUser.save();
        return res.status(200).send({
            message: "Registration successful"
        });
    }catch(error) {
        res.status(400).send(error)
    }
});

app.post("/loginUser", async (req, res) => {
    try{
        const EmailId = req.body.EmailId;
        const Password = req.body.Password;
        try {
            const useremail = await Registertable.findOne({EmailId});
            if (useremail.Password === Password) {
                
                const token = await useremail.generateAuthToken();
                res.cookie("jwt", token, {
                    httpOnly:true
                });
                
                res.status(201).send({
                    message: "Login successful!"
                });
            }
            else{
                res.status(200).send({
                    message:"Invalid Credentials"
                });
            }
        }catch{
        res.status(200).send({
            message: "Invalid Credentials"
        });
    }
    }catch(error){
        res.status(400).send(error)}
});

app.post("/post", auth, async (req, res) => {
    try{
        var newpost = {title: req.body.title, content: req.body.content}
        await Registertable.findOneAndUpdate({_id: req.rootuser_id},
            {$push: {userPost: newpost}}
        );
        return res
        }catch(error){
            console.log(error);
        }
});

app.get("/allpost", async(req, res) => {
    try{
        const posts = await Registertable.find();
        res.json(posts)
    }catch(error) {
        console.log(error);
    }
})

app.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.status(200).send({
        message: "Logout Successful"
    });
})

app.get("/", (req, res) => {
    res.send("There is some Technical Error")
});

app.listen(port, () => {
    console.log(`Listening from port ${port}`);
});
