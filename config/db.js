// var mongoose = require('mongoose');
import mongoose  from "mongoose";
import config from "config";
// const config = require('config');
var db = config.get("mongoURI");

// There is a issue with mongoose v8

// mongoose.connect(db)
mongoose.set('strictQuery', false);
export const connectDB = async() =>{
    try{
        await mongoose.connect(db,{
            // useUnifiedTopology: true,
            autoIndex: true,
        });
        console.log('MongoDB Connected....')
    }catch(err){
        console.log(err.message)
        // Exit process with failure
        process.exit(1)
    }
}

// module.exports = connectDB;