  const express = require("express")
  const router= express.Router()
  const bcrypt = require("bcryptjs")
  const User = require("../models/User")


  router.post('/', (req, res) => {
  
  const { email, fullName, password, password2 } = req.body
  console.log(req.body)
  let errors = []
  if (!email || !fullName || !password || !password2) {
    errors.push('All fields are required')
  }
  if (password != password2) {
    errors.push("Password doesn't match")
  }
  if (password.length < 6) {
    errors.push('Password must be a minimum of 6 characters')
  }
  if (errors.length > 0) {
    res.render('signup',{errors, email, fullName, password, password2})
  } else {
    User.findOne({ email: email }).then(user => {
      if(user) {
        errors.push('Email already exists')
        res.render('signup', errors)
      } else {
        const newUser = new User({
          email, fullName,password
        })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash
            newUser
            .save()
            res.redirect('/login')
          })
        })
        
      }
    })
  }

  console.log(req.body)
  })

  router.get("/", (req, res) => {
  res.render("signup", {errors: '' })
  })


  module.exports = router;