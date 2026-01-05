const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required:false,
        enum:["superadmin","admin"],
        default:"admin"
    },
},{timestamps:true});

const User = mongoose.model("User",userSchema);
module.exports = User;