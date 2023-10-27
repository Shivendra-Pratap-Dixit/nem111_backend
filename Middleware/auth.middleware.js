const jwt=require("jsonwebtoken");
const { blacklist } = require("../blaclist");
const auth=(req,res,next)=>{
const token=req.headers.authorization?.split(" ")[1];
if(!blacklist.includes(token)){
if(token){
    jwt.verify(token,"masai",(err,decoded)=>{
if(decoded){
   // console.log(decoded)
    req.body.userId=decoded.userID;
    req.body.username=decoded.username
    //console.log((req.body))
    next()
}else{
    res.send({"msg":"You are not authorized"})
}
    })
}else{
    res.send({"msg":"Please Login First"})
}
}else{
    res.status(200).send({"msg":"You have login again session expired"})
}
}
module.exports={
    auth
}