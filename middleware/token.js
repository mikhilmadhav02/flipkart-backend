const jwt = require('jsonwebtoken')


exports.webtoken=(req,res,next)=>{
    const token = req.headers.token

    const{loginkey} = jwt.verify(token,"key12345")
    if(loginkey){
        console.log('loginkey=',loginkey);
        req.username=loginkey
        console.log('req username=',req.username);
        next()
    }else{
        res.status(400).json("no login key,Please login to continue")
    }
   
   
    
   
}