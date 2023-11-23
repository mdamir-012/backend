const bcrypt= require("bcrypt");
const { Router } = require("express");
const jwt= require("jsonwebtoken");
const { TweetModel } = require("../models/Tweet.model");
require("dotenv").config();


const userController=Router();

const tweetController= Router();

// read
tweetController.get("/read", async(req,res)=>{
    const tweets= await TweetModel.find({userId: req.body.userId});
    res.send(tweets)
})

// create
tweetController.post("/create", async(req,res)=>{
    const {title,body,category,userId} =req.body;
    
    const tweet = new TweetModel({
        title,
        body,
        category,
        userId
    })

    try{
        await tweet.save();
        res.send("tweet created")
    }
    catch(err){
        console.log(err)
        res.send("something went wrong")
    }
})

// delete
tweetController.delete("/delete/:id", async(req,res)=>{
    const {id} =req.params;
    const deletedTweet= await TweetModel.findByIdAndDelete({_id: id})
    res.send("tweet deletd succesfully")
})


// update
tweetController.patch("/edit/:id", async(req,res)=>{
    const {id} =req.params;
    const updateTweet= await TweetModel.findByIdAndUpdate({_id:id, userId:req.body.userId} ,{...req.body})

    if(updateTweet){
        res.send("updated tweet")
    }else{
        res.send("not updated")
    }
})

module.exports = {tweetController}