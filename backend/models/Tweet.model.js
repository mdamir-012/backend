const mongoose = require("mongoose");

const tweetSchema= new mongoose.Schema({
    title:{type:String,required:true},
    body: {type:String,required:true},
    category: {type:String,required:true},
    userId: {type:String,required:true}
})

const TweetModel= mongoose.model("tweet",tweetSchema);

module.exports= {TweetModel}