const express = require("express");
const router = express.Router();
const Userdb = require("../models/game.model");
const Postdb = require("../models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')





router.get("/", async (req, res) => {

    if(!req.query.id){
        res.send('invalid id')
        return;
      }

      let post = 0
      try {
          post = await Postdb.find({ user: req.query.id })
  
      } catch (error) {
        return res.json( { invalid_id: 'invalid id : '+req.query.id  })
  
      }
  console.log(post);
      return res.render('doctor/dashboard.ejs', { data: post })





      res.render("doctor/dashboard.ejs")

});

router.get("/post", async (req, res) => {

  if(!req.query.id){
      res.send('invalid id')
      return;
    }

    let post = 0
    try {
        post = await Postdb.findById(req.query.id)

    } catch (error) {
      return res.json( { invalid_id: 'invalid id : '+req.query.id  })

    }
console.log(post);
    return res.render('doctor/post.ejs', { data: post })





    res.render("doctor/dashboard.ejs")

});






module.exports = router;
