const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const registerTemplate = new mongoose.Schema({
    EmailId:{
        type:String,
        trim:true
    },
    Username:{
        type:String,
        trim:true
    },
    Password:{
        type:String,
        trim:true
    },
    ConfirmPassword:{
        type:String,
        trim:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    userPost: [{
        title:{
            type:String
        },
        created_at:{
            type:Date,
            default:Date.now
        },
        content:{
            type:String
        }
    }],
    tokens: [{
        token: {
            type:String
        }
    }]
})

registerTemplate.methods.generateAuthToken = async function() {
    try{
        const token = jwt.sign({_id: this._id}, "My_token");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(error) {
        console.log(error);
    }
}

const Registertable = new mongoose.model("Registertable", registerTemplate);
module.exports = Registertable;
