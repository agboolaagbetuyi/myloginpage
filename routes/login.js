  const express= require("express")
  const router=express.Router()



  router.post("/", (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
  let errors=[]
  if(!email || !password){
    errors.push("All fields are required")
    res.render("login", {errors: ''})
  }   
  
  else{
    res.redirect('/dashboard')
  }
})

  router.get("/", (req, res) => {
  res.render('login', { errors: '' })
})

module.exports=router;