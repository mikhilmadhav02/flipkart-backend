const mongoose = require('mongoose')

const data = process.env.database

 mongoose.connect(data,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('server connected using mongoose');
}).catch(()=>{
    console.log('error while connecting mongoose');
})