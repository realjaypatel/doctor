const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
  txt: { type: String },
  img: { type: String },


});


module.exports = mongoose.model("post", postSchema);
