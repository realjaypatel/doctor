const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const gameSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  tokens: [{
    token: { type: String}
  }
  ]

});

gameSchema.methods.generateAuthToken =async function(){
  try{
    console.log('asdf')
    const token = jwt.sign({_id:this._id.toString()},'jwt')
    console.log('db',token)
    this.tokens = this.tokens.concat({token:token})
  
    await this.save();
    return token;
  }
  catch(e){
    return res.send('err'+e)
  }
}
module.exports = mongoose.model("game", gameSchema);
