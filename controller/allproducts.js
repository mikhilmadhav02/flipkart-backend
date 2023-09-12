const grocerys = require('../model/grocery')
const mobiles = require('../model/mobile')
const fashions = require('../model/fashion')
const electronics = require('../model/electronic')
const appliances = require('../model/appliance')
const toys = require('../model/toys')
const homes = require('../model/home')
const views = require('../model/viewproduct')

// grocery logic
exports.allgrocery= async (req,res)=>{
const preuser = await grocerys.find()
console.log(preuser);
res.status(200).json(preuser)
} 

// mobile logic
exports.allmobile=async (req,res)=>{
    const user = await mobiles.find()
    console.log(user);
    res.status(200).json(user)
}

// fashion call
exports.allfashion=async (req,res)=>{
    const user = await fashions.find()
    console.log(user);
    res.status(200).json(user)
}
// electronic call
exports.allelectronic = async (req,res)=>{
    const user = await electronics.find()
console.log(user);
res.status(200).json(user)
}

// appliances
exports.allappliance=async (req,res)=>{
    const user = await appliances.find()
    console.log(user);
    res.status(200).json(user)
}
// toys
exports.alltoys =async(req,res)=>{
    const user = await toys.find()
    res.status(200).json(user)
}
// home call
exports.allhome=async(req,res)=>{
    const user = await homes.find()
    res.status(200).json(user)
}


// viewproduct
exports.viewproduct=async(req,res)=>{
    const{id}=req.params
    const user = await views.findOne({id})
    res.status(200).json(user)
}

