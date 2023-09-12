const mongoose = require('mongoose')

const user = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    offerprice:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    percentage:{
        type:Number,
        required:true
    }
})

const fashions = mongoose.model("fashions" , user)
module.exports  = fashions