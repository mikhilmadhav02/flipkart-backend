const users = require('../model/user')
const jwt = require('jsonwebtoken')

exports.register=async (req,res)=>{
    const{name,mobile,mail,username,password}=req.body
const preuser = await users.findOne({username})
if(preuser){
    res.status(400).json("existing customer,login to continue")
}else{
   const newuser = new users({
    name,mobile,mail,username,password,wishlist:[],cart:[],address:[],order:[]
   })
   newuser.save()
   res.status(200).json("registered succesfully")
}

}

exports.login=async(req,res)=>{
    console.log(req.body);
    const{username,password}=req.body
    const user = await users.findOne({username,password})
    if(user){
       const token = jwt.sign({loginkey:username},"key12345")
       console.log(token);
       res.status(200).json({user,token})
    }else{
res.status(400).json("enter correct details")
    }
}

// wishlist add
exports.wishlist=async(req,res)=>{
    console.log('body===',req.body);
    const{username}=req
    console.log('loginkey===',username);
    const{id,image,brand,title,offerprice,price,percentage}=req.body
   const user = await users.findOne({username},{wishlist:{$elemMatch:{id}}})
   console.log('existing user===',user);
   if(user.wishlist.length==0){
    const preuser = await users.findOne({username})
    preuser.wishlist.push({id,image,brand,title,offerprice,price,percentage}) 
    await preuser.save()
    res.status(200).json("product added to wishlist")
   }else{
    res.status(200).json('product available in wishlist')
   }

}

// getwishlist
exports.getwishlist=async(req,res)=>{
    const{username}=req
    const user = await users.findOne({username})
    console.log('all wishlist=',user);
   
    res.status(201).json(user)

}

// addcart
exports.addcart=async (req,res)=>{
    const{username}=req
    console.log('token username==',username);
    console.log('addcart==',req.body);
    const{id,image,brand,title,offerprice,price,percentage}=req.body
var user = await users.findOne({username})
var preuser=[]
user.cart.forEach((item)=>{
    if(item.id.includes(id)){
       preuser.push(item)
    }else{
        console.log('print');
    }
})
        if(preuser.length==0){
            console.log('no same product');
            user.cart.push({id,image,brand,title,offerprice,price,percentage,quantity:1,total:offerprice,totalprice:price})
            await  user.save()
            res.status(200).json("added to cart")
           

        }else{
           await users.findOneAndUpdate({username,"cart.id":id},{$inc:{"cart.$.quantity":1}},{new:true})
           const newuser = await users.findOne({username},{cart:{$elemMatch:{id}}})
           console.log('new user====',newuser);
           const newprice= newuser.cart[0].quantity*newuser.cart[0].price
           const newtotal=newuser.cart[0].quantity * newuser.cart[0].offerprice
           console.log('total==',newtotal);
                    await users.findOneAndUpdate({username,"cart.id":id},{$set:{"cart.$.totalprice":newprice}},{new:true})
           const final =await users.findOneAndUpdate({username,"cart.id":id},{$set:{"cart.$.total":newtotal}},{new:true})
            res.status(200).json("product quantity incremented")
                console.log('final====',final);
        
        }    

}

// deletewish
exports.deletewishlist= async(req,res)=>{
    const{username}=req
const id=req.params.id
console.log('deletewishlist id==',id);
console.log('token username==',username);
 await users.findOneAndUpdate({username},{$pull:{wishlist:{id:id}}},{new:true})
 const user = await users.findOne({username})
res.status(200).json(user)
}

// getcart
exports.getcart=async (req,res)=>{
    const{username}=req
     const user=await users.findOne({username})
    res.status(200).json(user)

}
// plus
exports.plus= async(req,res)=>{
    const{username}=req
    const id=req.params.id
    await users.findOneAndUpdate({username,"cart.id":id},{$inc:{"cart.$.quantity":1}},{new:true})
    const user = await users.findOne({username},{cart:{$elemMatch:{id}}})
    const newprice= user.cart[0].quantity*user.cart[0].price
    const newtotal = user.cart[0].quantity*user.cart[0].offerprice
    console.log('newtotal======',newtotal);
    await users.findOneAndUpdate({username,"cart.id":id},{$set:{"cart.$.totalprice":newprice}},{new:true})
    const newuser= await users.findOneAndUpdate({username,"cart.id":id},{$set:{"cart.$.total":newtotal}},{new:true})
   res.status(200).json(newuser)
}

// minus
exports.minus=async (req,res)=>{
    const{id}=req.params
    const{username}=req
     await users.findOneAndUpdate({username,"cart.id":id},{$inc:{"cart.$.quantity":-1}},{new:true})
      const user = await users.findOne({username},{cart:{$elemMatch:{id}}})
      const newprice= user.cart[0].quantity*user.cart[0].price
      const newtotal = user.cart[0].quantity*user.cart[0].offerprice
      if(user.cart[0].quantity>0){
        await users.findOneAndUpdate({username,"cart.id":id},{$set:{"cart.$.totalprice":newprice}},{new:true})
        const newuser = await users.findOneAndUpdate({username,"cart.id":id},{$set:{"cart.$.total":newtotal}},{new:true})
            res.status(200).json(newuser)

      }else{
        const updateuser= await users.findOneAndUpdate({username},{$pull:{cart:{id}}},{new:true})
        console.log('updated user ===',updateuser);
        res.status(200).json(updateuser)
      }
      
}



// cartdelete
exports.cartdelete=async(req,res)=>{
    const{id}=req.params
    const{username}=req
   const user = await users.findOneAndUpdate({username},{$pull:{cart:{id:id}}},{new:true})
   res.status(200).json(user)
}

// save address
exports.saveaddress=async(req,res)=>{
    const{name,email,mobile,address,state,pincode}=req.body
     const{username}=req
       const user = await users.findOne({username})
       user.address.push({name,email,mobile,address,state,pincode})
       await user.save()
         res.status(200).json(user)

}
 
// allcartdelete
exports.allcartdelete=async(req,res)=>{
    const{username}=req
    console.log('deletedone username =====',username);
    const user = await users.findOneAndUpdate({username},{$set:{cart:[]}},{new:true})
    console.log('deletedone username =====',username);
    res.status(200).json(user)
}

// cartvalue
exports.cartvalue=async (req,res)=>{
    const{username}=req.params
    const user = await users.findOne({username})
      console.log('user=========',user);
        res.status(200).json(user)

}


// saveorder
exports.orderdetails=async(req,res)=>{
    const{username}=req
    const{d,m,y,id,image,brand,title,offerprice,price,percentage,quantity,total,totalprice}=req.body
    console.log('order details,username==',username);
    console.log('orderdetails',req.body);
    
    const user = await users.findOne({username})
     user.order.push({d,m,y,id,image,brand,title,offerprice,price,percentage,quantity,total,totalprice})
      user.save()
      res.status(200).json(user)
}

// deleteaccount
exports.deleteaccount=async(req,res)=>{
    const{confirm}=req.body
    const{username}=req
    console.log('new password ===',confirm);
    const newuser = await users.findOne({username})
    if(newuser.password==confirm){
        const user = await users.deleteOne({username})
        res.status(200).json(user)
    console.log('user deleted');
    }else{
        res.status(400).json('wrong password')
    }
    
    
    
}

// delete address
exports.deleteaddress=async(req,res)=>{
    const{name}= req.params
    const {username}=req
    const user = await users.findOneAndUpdate({username},{$pull:{address:{name}}})
    res.status(200).json(user)
}

// getorder







// const preuser= user.wishlist
// preuser.forEach((item)=>{
//  if(item.id==id){
//      res.status(400).json("product already in wishlist")
     
//  }
//  user.wishlist.push({id,image,brand,title,offerprice,price,percentage}) 
//     })
//     await user.save()
//       res.status(200).json("product added succesfully")
    