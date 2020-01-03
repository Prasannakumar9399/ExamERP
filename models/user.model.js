const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
var userSchema=new mongoose.Schema({
    userName:{type:String,required:"Username can't be empty!",unique:true},
    firstName:{type:String,required:"Firstname can't be empty!"},
    lastName:{type:String,required:"Lastname can't be empty!"},
    email:{type:String,required:"Email can't be empty!",unique:true},
    gender:{type:String},
    pass:{type:String,required:"Password can't be empty!",minlength:[4,'Password must be atleast 4 character long ']},
    cpass:{type:String,required:"Confirm Your Password!"},
    role:{type:String,default:'student',enum:["student","admin"]},
    saltSecret:String
});
//pre event
userSchema.pre('save',function (next) {
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.pass,salt,(err,hash)=>{
            this.pass=hash;
            this.saltSecret=salt;
            next();
        });
    });
});
//adding instance method to userSchema
userSchema.methods.verifyPassword=function(pass){
    return bcrypt.compareSync(pass,this.pass);
}

userSchema.methods.generateJwt=function(){
    return jwt.sign({_id:this._id},
    process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXP
    });

}

mongoose.model('User',userSchema);
