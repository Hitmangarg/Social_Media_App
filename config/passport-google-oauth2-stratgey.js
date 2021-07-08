const require=require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto =require('crypto');
const User=require('../models/user');
//tell passport to use the new strategy for google login
passport.use(new googleStrategy({
    clientID:"357966643428-cil7qflp9g9rnd3o6557j2fr2modtitd.apps.googleusercontent.com",
    clientSecret:"l-77kn1dH7-taai9bPYYT_lg",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},
function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google strategy passport',err);
            return;
        }
        console.log(profile);
        if(user){
            //if found set this user as req.user
            return done(null,user);
        }
        else{
            //else not found create the user and set req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },
            function(err,user){
                if(err){
                    console.log('eor in creating user  google strategy passport',err);
                    return;
                }
                return done(null,user);
            })
        }
    })
}
))
module.exports= passport;