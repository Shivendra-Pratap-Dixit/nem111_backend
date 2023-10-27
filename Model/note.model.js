const mongoose=require("mongoose");
const noteSchema=mongoose.Schema({
    title:String,
    body:String,
    userId:String,
    username:String
},{versionKey:false})
const notemodel=mongoose.model('note',noteSchema);
module.exports={
    notemodel
}