const bcrypt =require("bcrypt");
const { Router } = require("express");
const jwt= require("jsonwebtoken");
const { userModel } = require("../models/User.model");
require("dotenv").config()

const userController = Router();

// signup
userController.post("/signup" ,(req,res)=>{
    const {name,email,password,gender,country} = req.body;
    bcrypt.hash(password, 5, async(error,hash)=>{
        if(error){
            res.send("something went wrong,please try again")
        }
        const user =new userModel({
            name,
            email,
            password: hash,
            gender,
            country
        })
        try{
            await user.save()
            res.json({message:"signup succesfully"})
        }
        catch(err){
            console.log(err)
            res.json({message:"something went wrong,please try again"})
        }
    })
})

// login
userController.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email})
    const hash = user.password;

    bcrypt.compare(password, hash, function(err,result){
      if(err){
        res.json({message:"something went wrong,please try again"})
      }if(result){
        const token =jwt.sign({userId : user._id},process.env.JWT_SECRET);
        res.json({message:"login succesfull",token})
      }else{
        res.json("Invalid credentials,please sign up")
      }

    })
})


module.exports= {userController}
