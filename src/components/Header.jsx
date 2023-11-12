import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

  return (
    <header className=' h-16 w-screen flex justify-between justify-items-center p-4 shadow-md'>
        <h6 className=' text-blue-900 cursor-pointer text-2xl' 
        onClick={() => navigate("/")} >
         Vislog
        </h6> 
        <div className=' text-justify text-lg'>
            <button onClick={() => navigate("/register")}>Register</button>
            <button className=' ml-3' onClick={() => navigate("/login")}>Login</button>
        </div>
    </header>
  )
}

export default Header
