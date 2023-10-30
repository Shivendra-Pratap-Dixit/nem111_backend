import React, { useState } from 'react'
import axios from "axios"
const Signup = () => {
    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("");
    const [username,setUsername]=useState("");
    const handlesignup=(e)=>{
      e.preventDefault()
      const payload={
        username,
        email,
        pass
      }
      // console.log(payload)
    //   fetch("https://fuzzy-bull-pajamas.cyclic.app/users/register",{
    //   method:"POST",
    //   headers:{
    //     "Content-type":"application/json"
    //   },
    //   body:JSON.stringify(payload)
    // }).then(res=>res.json())
    // .then(res=>console.log(res))
    // .catch(err=>console.log(err))
    axios.post("https://fuzzy-bull-pajamas.cyclic.app/users/register",payload,{
      headers:{
        "Content-type":"application/json"
      }
    }).then(res=>console.log(res))
    .catch(err=>console.log(err))
    }

  return (
    <>
    <h3>Signup</h3>
    <form>
    <input type='text' placeholder='Enter Your Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
    <br/>
        <input type='email' placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br/>
        <input type='password' placeholder='Enter Your Password..' value={pass} onChange={(e)=>setPass(e.target.value)}/>
        <br/>
       <button onClick={handlesignup}>Signup</button>
    </form>
</>
  )
}

export default Signup