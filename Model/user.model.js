const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    username:String,
    email:String,
    pass:String
},{versionKey:false})
const usermodel=mongoose.model('user',userSchema);
module.exports={
    usermodel
}