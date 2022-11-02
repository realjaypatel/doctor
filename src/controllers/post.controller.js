const express = require("express");
const router = express.Router();
const Userdb = require("../models/game.model");
const Postdb = require("../models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const path = require("path")
const fileUpload = require("express-fileupload");
















let fileuploader = (d)=>{
   file = d;
  console.log(file);
  filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}` +file.name
   p = __dirname + "\\..\\..\\uploads\\" +filename;


  file.mv(p, (err) => {
    if (err) {
     return 0
    }
 return filename
  });
  
  

  return filename
}














router.post("/addpost",auth,async (req, res) => {


  let file1 = 'default.jpg'

  if(req.files){
    let filev = req.files.myfile;
let file1 = await fileuploader(filev)
  }

console.log(file1)



















console.log('got a addpost req')











if(!req.user){
  return res.json({msg:'no user found'})
}




  const newpost = new Postdb({
user:req.user._id,
txt:req.body.txt,
title:req.body.title,
 img:file1

  })
newpost.save().then((post) =>{
  
  return res.redirect('/dashboard/add-post')
}
  )
.catch(err =>res.json(err))
});


router.get("/:id", async (req, res) => {
  post = ''
    try {
      let post = await  Postdb.findById(req.params.id)
  
    } catch (error) {
      return res.json({err: error,msg:'no post with that id found'})
    }
  
  return res.json(post)
  
  
  
  });
  








  
// router.get("/", async (req, res) => {

//   Postdb.find()
//   .sort({date: -1})
//   .then(j => res.json(j))
//   });


router.delete("/:id",auth, async (req, res) => {
    console.log('delete id',req.params.id)
      if(!req.user){
        return res.json({msg:req.user,msg2:'not allowed'})
      }
      try {
        Postdb.findById(req.params.id)
        .then(post =>{
    //check for post owner;
  
  if(post.user.toString() !== req.user._id.toString()){
      return res.json({ notauthorised:'access denied'})
    }
    //delete post
    post.remove().then(()=>{
    return res.json({success:'true'})
    })
        }).catch((e)=>{
          return res.json({postnotfound:"post not found"})
        })
    
    
      } catch (error) {
        return res.json({error})
      }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        });

router.put("/:id",auth, async (req, res) => {
console.log('====>',req.body.title,req.body.txt,req.params.id)

  if(!req.user){
    return res.json({msg:req.user,msg2:'not allowed'})
  }
  if(!req.body){
    return res.send({ message : "Data to update can not be empty"})
}

 try {
  const post = await Postdb.findById(req.params.id)

  if(!post){
    return res.json({postnotfound:"post not found"})
  }
  let updated_data = post
  updated_data.txt = req.body.txt
  updated_data.title = req.body.title

  console.log('=>>',updated_data)
  if(post.user.toString() == req.user._id.toString()){
  await post.updateOne({$set:updated_data})
  return res.json({msg:'your data has been updated successfully !'})
  }else{
    return res.json({ notauthorised:'access denied :- not by owner'})
  }


    



























    
  } catch (error) {
return res.json({err:error})
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        });


    
module.exports = router;
