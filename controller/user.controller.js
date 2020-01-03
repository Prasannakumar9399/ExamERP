//this is the register function which will be used by other module
const mongoose=require('mongoose');
//This User is a user model
const User=mongoose.model('User');
//storing user login details in lodash
const load=require('lodash');
const passport=require('passport');
module.exports.register=(req,res,next)=>{
    //console.log("Inside register Function");
    var user=new User();
    user.userName=req.body.userName;
    user.firstName=req.body.firstName;
    user.lastName=req.body.lastName;
    user.email=req.body.email;
    user.gender=req.body.gender;
    user.pass=req.body.pass;
    user.cpass=req.body.cpass;
    //before saving the users we have to call bcrypt function to encrypt password
    user.save((err,data)=>{
        if(!err){res.send(data)}
    })
}
module.exports.login=((req,res,next)=>{
   // console.log("Inside Login Function")
   var checkUser=User.find({userName:req.body.userName});
   checkUser.exec((err,data)=>{
       if(!err)
         res.send(data)
       });
});

module.exports.authenticate=(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err)
        return res.status(400).json(err);
        else if(user)
        return res.status(200).json({'token':user.generateJwt()})
        else
        return res.status(404).json(info);
    })(req,res);
}
module.exports.userProfile=(req,res,next)=>{
    User.findOne({_id:req._id},(err,user)=>{
        if(!user)
         return res.status(404).json({status:false,message:'User Record not found'});
         else
          return res.status(200).json({status:true,user:load.pick(user,['firstName','lastName','role','email'])});
    })
};

