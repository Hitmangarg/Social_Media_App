const passport = require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    // to pass the req in the function
    passReqToCallback : true

},
function(req,email, password, done){
    //find a user establish the identity;
    User.findOne({email:email},function(err,user){
        if(err)
        {
            req.flash('error',err);
            //console.log('Error in finding user -->Passport');
            return done(err);
        }
        if(!user|| user.password != password){
            req.flash('error' ,'Invalid Username/Password');
            //console.log('Invalid Username/Password');
            return done(null,false);
        }
        return done(null,user);
    });
}

));
//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})
//desiraliziing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
        console.log('Error in finding user -->Passport');
        return done(err);}
        return done(null,user);
    })
})
passport.checkAuthentication=function(req,res,next){
   // If user is sign in then pass on the request to the next function(Controller actions) 
    if(req.isAuthenticated())
    return next();
    // if user is not signed in 
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req. user contains the current signed in user from the session cookie and we are just sendting this to the locals for the views
        res.locals.user=req.user;
    }
    return next();
}
module.exports=passport;