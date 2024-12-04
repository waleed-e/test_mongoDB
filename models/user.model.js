const mongoose = require('mongoose')
var validator = require('validator');
const userSchema =new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    follwers:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true, validate: [validator.isEmail,'filled must be a valid email']
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },role:{
        type:String,
        enum:["USER","ADMIN","MANGER"],
        default:"USER"
    },avatar:{
        type:String,
        default:'../uploads/logo.jpg'
    }
  })



const User = mongoose.model('User', userSchema);

module.exports = User;