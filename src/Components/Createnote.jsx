import React, { useState } from 'react'
import axios from "axios"
const Createnote = () => {
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("");
    const handleNote=()=>{
        const payload={
            title,
            body
        }
        axios.post("https://fuzzy-bull-pajamas.cyclic.app/notes/create",payload,{
          headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
        }).then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }

  return (
    <div>
        <input type='text' placeholder='Enter Title...' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <br/>
        <textarea cols="30" rows="30" placeholder='Enter Details of Note....' value={body} onChange={(e)=>setBody(e.target.value)}></textarea>
        <br />
        <button onClick={handleNote}>CreateNote</button>
    </div>
  )
}

export default Createnote