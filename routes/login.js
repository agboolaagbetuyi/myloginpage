  const express= require("express")
  const passport= require('passport')
  const router=express.Router()

  router.post("/", (req, res) => {
    
    passport.authenticate('local', {
      succesRedirect: '/dashboard',
      failureRedirect: '/user/login',
      failureFlash: true
    })(req, res, next);
    

    const userLogout = (req, res)=> {
      req.logout(function(err){
      if(err){ return next (err)}
      res.redirect('/user/login');
      req.flash('success_msg', 'you are logged out');

    });
  }
    
    
    
  //   const { email, password } = req.body
  //   console.log(req.body)
  // let errors=[]
  // if(!email || !password){
  //   errors.push("All fields are required")
  //   res.render("login", {errors: ''})
  // }   
  
  // else{
  //   res.redirect('/dashboard')
  // }
})

  router.get("/", (req, res) => {
  res.render('login', { errors: '' })
})

module.exports=router;