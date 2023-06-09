const LocalStrategy = require ('passport-local').Strategy;
const bcrypt = require ('bcryptjs');

const User = require('../models/User');


module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email'}, ( email, password, done) =>{

    User.findOne({
      email:email
    }) .then(user=>{
      if (!user){
        return done (null, false, {message: 'the email is not registered'});
      }

      bcrypt.compare(password, user.password, (err, isMatch) =>{
        if (err) throw err;
        if (isMatch){
          return done(null, user);
        }else{
          return done(null, false,{message: 'password incorrect'});
        }
      });
    }) ;
    })
  );

  passport.serialized( function(user, done) {
    done (null, user.id)
  });
  passport.deserializedUser( function(user, done) { done(null, user)})
};