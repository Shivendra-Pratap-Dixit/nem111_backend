const express=require("express")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const { usermodel } = require("../Model/user.model");
const { blacklist } = require("../blaclist");
const userRouter=express.Router();
userRouter.post("/register",(req,res)=>{
const {username,email,pass}=req.body
try {
    bcrypt.hash(pass,4,async(err,hash)=>{
if(err){
    res.status(200).send({"error":err.message})
}else{
    const user=new usermodel({username,email,pass:hash})
    await user.save()
    res.status(200).send({"msg":"A new registered","user":user})
}
    })
} catch (error) {
    res.status(400).send({"error":error})
}
})
userRouter.post('/login',async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await usermodel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    const token=jwt.sign({username:user.username,userID:user._id},'masai',{expiresIn:'2h'})
                    res.status(200).send({"msg":"Login successfull!", "token":token})
                }else{
                    res.status(200).send({"msg":"Check Your Creddentials"})
                }
            })
        }
    } catch (error) {
        res.status(400).send({"error":error })
    }  
})
userRouter.get("/logout",(req,res)=>{
        const token=req.headers.authorization?.split(" ")[1];
        try {
            blacklist.push(token)
            res.status(200).send({"msg":"User has been logged out"})
        } catch (error) {
            res.status(400).send({"error":error })   
        }
    })
module.exports={
    userRouter
}