import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

  return (
    <header className=' h-16 w-screen flex justify-between justify-items-center p-4 shadow-md'>
      <img src="https://img.logoipsum.com/243.svg" alt="" onClick={() => navigate("/")} className=' cursor-pointer' />
        <div className=' text-justify text-lg'>
            <button onClick={() => navigate("/register")}>Register</button>
            <button className=' ml-3' onClick={() => navigate("/login")}>Login</button>
        </div>
    </header>
  )
}

export default Header
