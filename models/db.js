var mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true},(err)=>{
    if(!err){
        console.log("MongoDB Connection Succeeded:");
    }else{console.log('Error in MongoDB Connection'+JSON.stringify(err,undefined,2));}
});
require('./user.model');
require('./Quiz');
require('./Question');
