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
    }
})

const products = mongoose.model("products",user)

module.exports = products