const express =require("express");
const cors =require("cors")
const { connection } = require("./config/db");
const { userController } = require("./routes/user.routes");
const { authentication } = require("./middlewares/authentication");
const { tweetController } = require("./routes/tweet.routes");
const app=express();



const PORT=8080;
app.use(express.json());

app.get("/", (req,res)=>{
    res.json({message:"homepage"})
})

app.use(cors())

app.use("/user", userController)
app.use(authentication)
app.use("/tweets",tweetController)

app.listen(PORT, async()=>{
    try{
        await connection
        console.log("connected to mongodb succesfully")

    }
    catch(error){
        console.log("error while connecting")
        console.log(error)
    }
    console.log(`listening on port ${PORT}`)
})