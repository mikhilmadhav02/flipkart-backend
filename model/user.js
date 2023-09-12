const mongoose = require('mongoose')

const user = new mongoose.Schema({

name:{
    type:String,
    required:true
},
mobile:{
    type:Number,
    required:true
},
mail:{
    type:String,
    required:true
},
username:{
    type:String,
    required:true,
    
},
password:{
    type:String,
    required:true
},
wishlist:{
    type:Array,
    required:true
},
cart:{
    type:Array,
    required:true
},
address:{
    type:Array,
    required:true
},
order:{
    type:Array,
    required:true
}

})

const users = mongoose.model("users",user)
module.exports =users