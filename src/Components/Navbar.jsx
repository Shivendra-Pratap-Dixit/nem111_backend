import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{display:"flex",justifyContent:"space-between",padding:"10px",margin:"10px 5px 5px 10px"}}>
        <div><Link to="/"><h4 style={{backgroundColor:"black",border:"none",color:"whitesmoke",padding:"5px",borderRadius:"5px"}}>Note App</h4></Link></div>
        <div><Link to="/createnote"><h4 style={{backgroundColor:"black",border:"none",color:"whitesmoke",padding:"5px",borderRadius:"5px"}}>Create New Note</h4></Link></div>

        <div>
            <Link to="/login"><button style={{backgroundColor:"black",border:"none",color:"whitesmoke",padding:"5px",borderRadius:"5px"}}>Login</button></Link>
        </div>
        <div>
            <Link to="/signup"><button style={{backgroundColor:"black",border:"none",color:"whitesmoke",padding:"5px",borderRadius:"5px"}}>Signup</button></Link>
        </div>
    </div>
  )
}

export default Navbar