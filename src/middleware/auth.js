const jwt = require('jsonwebtoken');
const Userdb = require("../models/game.model");

const auth = async (req, res,next) => {
    try {
        const token = req.cookies.jwt


        const verifyUser = await jwt.verify(token,'jwt')

         user = 0
        try {
             user = await Userdb.findOne({_id: verifyUser._id})
        
        } catch (error) {
            
        }
        if(user){      
            req.user = user 
            console.log('===>',req.files)
        }else{
            req.user = 0
        }


        next();
    } catch (error) {
        return res.json({e:error})
    }
}
module.exports = auth;