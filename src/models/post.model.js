const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  date: { type: Date, default: Date.now },
  title: { type: String },
   logo: { type: String },
  thumbnail: { type: String },
  cardImage: { type: String },
  // cardTagline: { type: String },
  // price: {
  //   mainPrice: { type: Number },
  //   discountedPrice: { type: Number },
  //   discount: { type: Number },
  // },
  // developer: { type: String },
  // publisher: { type: String },
  releaseDate: { type: String },
  // platform: [{ type: String }],
  description: { type: String },
  // genres: [{ type: String }],
  // features: [{ type: String }],
  // tags: [{ type: String }],
  about: { type: String },
  // gameFeatures: [{ type: String }],
  // heroImages: [{ type: String }],
   images: { type: Array },
  rating: {
    criticRecommend: { type: Number },
    topCriticAverage: { type: Number },
    openCriticrating: { type: String },
  },
  reviews: [
    {
      organisation: { type: String },
      author: { type: String },
      rating: { type: String },
      description: { type: String },
      link: { type: String },
    }
  ],
  downloadNumber: { type: Number },
  downloadLink: { type: String },
  gameFile: { type: String },
platform: { type: String },
youtube_link: { type: String },

});


module.exports = mongoose.model("post", postSchema);
