import React, { useState } from 'react'
import axios from "axios"
const Login = () => {
    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("")
    const handlelogin=(e)=>{
      e.preventDefault()
      const payload={
        email,
        pass
      }
     console.log(payload)
    
    fetch("https://fuzzy-bull-pajamas.cyclic.app/users/login",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res=>{console.log(res)
    localStorage.setItem("token",res.token)
    })
    .catch(err=>console.log(err))
    // axios.post("https://fuzzy-bull-pajamas.cyclic.app/users/login",payload,{
    //   headers:{
    //     "Content-type":"application/json"
    //   }
    // }).then(res=>console.log(res.data))
    // .catch(err=>console.log(err))
    
   }
  return (
    <>
    <h3>Login</h3>
    <form>
        <input type='email' placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br/>
        <input type='password' placeholder='Enter Your Password..'value={pass} onChange={(e)=>setPass(e.target.value)}/>
        <br/>
        <button onClick={handlelogin}>Login</button>
        </form>
</>
  )
}

export default Login