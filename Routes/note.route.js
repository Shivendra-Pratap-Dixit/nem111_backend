const express=require("express");
const {notemodel}=require("../Model/note.model");
const { auth } = require("../Middleware/auth.middleware");
const noteRouter=express.Router()
noteRouter.use(auth)
noteRouter.post("/create",async(req,res)=>{
try {
    const newnote=new notemodel(req.body);
    await newnote.save();
    res.status(200).send({"msg":"New Note added Succesfully","newnote":newnote})
} catch (error) {
    res.status(400).send({"error":error})
}
})
noteRouter.get("/",async(req,res)=>{
    try {
        const notes=await notemodel.find({username:req.body.username})
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({"error":error})
    }
})
noteRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    const note= await notemodel.findOne({_id:id})
    try {
        if(req.body.userId===note.userId){
        await notemodel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":`The note with id ${id} has been updated`})
        }else{
            res.status(200).send({"msg":"You are not authorized"})
        }
    } catch (error) {
        res.status(400).send({"error":error})
    }
})
noteRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    const note= await notemodel.findOne({_id:id})
    try {
        if(req.body.userId===note.userId){
        await notemodel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":`The note with id ${id} has been deleted`})
        }else{
            res.status(200).send({"msg":"You are not authorized"})
        }
    } catch (error) {
        res.status(400).send({"error":error})
    }
})
module.exports={
    noteRouter
}