const express = require("express");
const router = express.Router();

const Userdb = require("../models/game.model");



router.post("/register", async (req, res) => {

  
  try {
    const email = req.body.email;
    useremail = await Userdb.findOne({ email:email});
   
  } catch (error) {
    
  }
if(useremail){
  return res.json({msg:'email already in use'})
}

try{
  

  const user = new Userdb(
    req.body
  )
  const registered = await user.save();


  console.log('a')
const token = await registered.generateAuthToken();

res.cookie("jwt",token,{
  expires: new Date(Date.now()+(1000*60*60*24*30)),
  httpOnly: true
})

















  return res.send(registered);
}
catch(err){
  return res.send(err)
}
});



router.post("/login", async (req, res) => {


  try{
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    
    const useremail = await Userdb.findOne({ email:email});
    if(useremail){
      // console.log(useremail)
      console.log(useremail.password)
      if(useremail.password == password){
        console.log('a1')
        const token = await useremail.generateAuthToken();

res.cookie("jwt",token,{
  expires: new Date(Date.now()+(1000*60*60*24*30)),
  httpOnly: true
})
return res.json({a:'success'})
      }else{
        return res.send('password mismatch')
              }

    }  
      if(!useremail){
     return res.send('email not found')
    }






  }
  catch(err){
    return res.send(err)
  }
  });
  
router.get("/logout", async (req, res) => {

res.clearCookie("jwt",{
  secure:true,
})
return res.json({success:'user logged out'})

 });
    
  
module.exports = router;
