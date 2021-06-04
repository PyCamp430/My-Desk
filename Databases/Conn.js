const mongoose = require("mongoose");

mongoose.connect("mydata", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(() => {
    console.log("Connection successful");
}).catch((error) => {
    console.log("No connection");
}) 
