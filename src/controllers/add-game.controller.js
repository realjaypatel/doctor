const express = require("express");
const router = express.Router();
const Games = require("../models/game.model");
var objectId = require('mongodb').ObjectID;
router.use(express.json())


router.get("/", async (req, res) => {
res.render('edea.ejs')
});

router.post("/", async (req, res) => {
    let body = req.body;
let t = {
 
    title: body.title,
    thumbnail:body.thumbnail,
    logo:body.logo,
    cardImage:body.cardImage,
    cardTagline: body.cardTagline,
    price:objfx(body.price),
    developer: body.developer,
    publisher: body.publisher,
    releaseDate:body.releaseDate,
    platform: body.platform,
    description:
      body.description,
    genres: objfx(body.genres),
    features: objfx(body.features),
    tags: objfx(body.tags),
    aboutGame:
      body.aboutGame,
    gameFeatures: arfx(body.gameFeatures),
    heroImages:arfx(body.heroImages),
    images:arfx(body.images),
    downloadLink: body.downloadLink

  }
await fxn(t).then((a)=>{
    console.log('success adding game')
  res.send(a._id)
})

});


module.exports = router;

let objfx = (t)=>{
    if(t){
    obj = t ;
    } else {
        return {}
    }
 jsonStr = obj.replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {
 return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
});

obj = JSON.parse(jsonStr); //converts to a regular object
return obj || {}
}
let arfx = (t)=> {
    if (t){
    return JSON.parse(t)
    } else {
        return []
    }
}

const Game = require("../models/game.model");
let fxn = async (d)=>{
   
     game =  await Game.create(d);
     console.log(game)
     console.log('adding game')
     return game._id
  }