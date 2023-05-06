const express = require("express")
const app = express()
const port = 3005 
const ejs = require("ejs")

const aboutRouter =require("./routes/about")
const dashboardRouter= require("./routes/dashboard")
const homeRouter =require("./routes/home")
const loginRouter= require("./routes/login")
const navbarRouter= require("./routes/navbar")
const signupRouter =require("./routes/signup")
const { mongoose } = require("mongoose")

require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI

mongoose
.connect(MONGO_URI)
.then(() => {
  console.log('MongoDB connected')

})
.catch(error => console.log(error))


app.use("/public", express.static(__dirname + "/public"))

app.use("/css", express.static(__dirname + "/public/css"))

app.use("/js", express.static(__dirname + "/public/js"))


app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))



app.use("/about", aboutRouter)
app.use("/dashboard", dashboardRouter)
app.use("/home", homeRouter)
app.use("/login", loginRouter)
app.use("/", navbarRouter)
app.use("/signup", signupRouter)



app.listen(port, () => {
  console.log(`listening on port ${port}`)
})