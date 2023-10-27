const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/user.route");
const { noteRouter } = require("./Routes/note.route");
const cors=require("cors")
const app=express();
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/notes",noteRouter)
app.listen(9090,async()=>{
    try {
        await connection
        console.log("Connectected to server 9090 and db")
    } catch (error) {
        console.log(error)
    }
        
    
})