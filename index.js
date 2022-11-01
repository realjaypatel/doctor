require("dotenv").config()
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const auth = require('./src/middleware/auth')
const fileUpload = require("express-fileupload");




app.use(express.json())
app.use(express.static('public'))
app.use(express.static('uploads'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(fileUpload({createParentPath: true}));





//cors
const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));


























//controllers

const authController = require("./src/controllers/auth.controller.js");
const postController = require("./src/controllers/post.controller.js");
const dashController = require("./src/controllers/dashboard.controller.js");

app.use("/auth", authController);
app.use("/post", postController);
app.use("/dashboard", dashController);
























app.get("/test", auth, (req, res) => {
  res.json({ a: req.user })
})










app.get("/auth", (req, res) => {
  res.render("auth.ejs")
})
app.get("/", auth, (req, res) => {
  res.json({ a: req.user })
})

module.exports = app