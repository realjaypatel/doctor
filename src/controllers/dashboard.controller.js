const express = require("express");
const router = express.Router();
const Userdb = require("../models/game.model");
const Postdb = require("../models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')





router.get("/", auth, async (req, res) => {

    if (!req.user) {
        return res.json({ notlogin: 'not authorized' })
    }
    let post = 0
    try {
        post = await Postdb.find({ user: req.user._id })

    } catch (error) {

    }

    return res.render('dash2/index.ejs', { posts: post })



});
router.get("/add-post", auth, async (req, res) => {

    if (!req.user) {
        return res.json({ notlogin: 'not authorized' })
    }


    return res.render('dash2/add-post.ejs')



});

router.get("/update-post", auth, async (req, res) => {
    if(!req.query.id){
        res.send('invalid id')
        return;
      }
    if (!req.user) {
        return res.json({ notlogin: 'not authorized' })
    }
    let post = 0
    try {
        post = await Postdb.findById( req.query.id)

    } catch (error) {
res.json({msg:error})
    }
    if(!post){
        return res.json({ postnotfound: 'nopost found with this id' })
    }
console.log('===>',post)
    return res.render('dash2/update_post.ejs',{post:post})



});




module.exports = router;
