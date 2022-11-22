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

console.log('......./',req.body.platform)



//   if(req.files){
//      gameFile = await fileuploader(req.files.gameFile)
//  logo = await fileuploader(req.files.logo)
//  thumbnail = await fileuploader(req.files.thumbnail)
// images = []

// for(let x = 0; x < req.files.images.length;x++){
//   console.log('===>',x)
//   data = await fileuploader(req.files.images[x]);
//   images[x] = data
// }




//   }else{
//    //yaha sab handle karna hai ki file nahi aayi to kya karna hai
//   }
gameFile = '';
logo = ''
thumbnail = '';
images = []
  if(req.files){


    try {
      gameFile = await fileuploader(req.files.gameFile)
    } catch (error) {
      
    }
    
    try {
      
    
    logo = await fileuploader(req.files.logo)
    } catch (error) {
      
    }
    
    try {
      
    thumbnail = await fileuploader(req.files.thumbnail)
    } catch (error) {
      
    }
    
    try {
      images = []
    
    for(let x = 0; x < req.files.images.length;x++){
    console.log('===>',x)
    data = await fileuploader(req.files.images[x]);
    images[x] = data
    }
    } catch (error) {
      
    }
    
    
    
     }else{
     
     }


if(!req.user){
  return res.json({msg:'no user found'})
}




  const newpost = new Postdb({
user:req.user._id,
logo:logo,
thumbnail:thumbnail,
title:req.body.title,
about:req.body.about,
images:images,
releaseDate:req.body.releaseDate,
platform:req.body.platform,
gameFile:gameFile,
  })
newpost.save().then((post) =>{
  
  console.log('000==>',post)
  console.log('00==>',images)
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

















router.post("/update/:id",auth, async (req, res) => {
  console.log('../',req.files)

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
  updated_data.title = req.body.title
  updated_data.about = req.body.about
  updated_data.releaseDate = req.body.releaseDate
  updated_data.platform = req.body.platform


  if(req.files){


try {
  gameFile = await fileuploader(req.files.gameFile)
  updated_data.gameFile = gameFile

} catch (error) {
  
}

try {
  

logo = await fileuploader(req.files.logo)
updated_data.logo = logo
console.log('logo', logo)
} catch (error) {
  console.log('logo error', error)
}

try {
  
thumbnail = await fileuploader(req.files.thumbnail)
console.log('++++++++++++>',thumbnail)
updated_data.thumbnail = thumbnail
} catch (error) {
  
}

try {
  images = []

for(let x = 0; x < req.files.images.length;x++){

data = await fileuploader(req.files.images[x]);
images[x] = data
}
updated_data.images = images
} catch (error) {
  
}



 }else{
 
 }












  if(post.user.toString() == req.user._id.toString()){
  await post.updateOne({$set:updated_data})
  return res.redirect('/dashboard/update-post?id='+req.params.id)
  }else{
    return res.json({ notauthorised:'access denied :- not by owner'})
  }


    



























    
  } catch (error) {
return res.json({err:error})
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        });


    
module.exports = router;
