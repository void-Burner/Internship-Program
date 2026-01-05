const mongoose = require("mongoose");

const connectDB = async () => {
   await  mongoose.connect("mongodb://localhost:27017/1")
    console.log("Connected to MongoDB");
}

module.exports = connectDB;