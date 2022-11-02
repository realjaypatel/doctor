const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{ type: String},
  txt: { type: String },
  img: { type: String },
  date: { type: Date, default: Date.now },

});


module.exports = mongoose.model("post", postSchema);
