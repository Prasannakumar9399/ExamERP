const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');

var User=mongoose.model('User');

passport.use(
    new localStrategy({usernameField:'userName',passwordField:'pass'},(username,pass,done)=>{
        User.findOne({userName:username},
        (err,user)=>{
            //if err return err
            if(err)
             return done(err);
             //unknown user
            else if(!user)
                return done(null,false,{message:'Email not registered'});
            
            //wrong password
            else if(!user.verifyPassword(pass))
                return done(null,false,{message:'Wrong password.....'});
            
            //valid
            else
              console.log(user);
                return done(null,user);
            
        });
    }));
