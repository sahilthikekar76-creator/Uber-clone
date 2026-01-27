import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[captainData,setCaptainData]=useState({});
  const handleSubmit=(e)=>{
    e.preventDefault();
    setUserData({
      email:email,
      password:password,
    })
    setEmail('');
    setPassword('');
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
      <div className="">
        <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRu9QNvM8_gANe0dGGCtqSuGH-7UueXlYROMGquTf75auAZTtxQ" className='w-14  mb-10'></img>
      <form onSubmit={handleSubmit} className="">
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input type="email" value={email} 
        onChange={(e)=>{
          setEmail(e.target.value);
        }}
        required placeholder='email@gmail.com' className='bg-[#eeeeee] rounded mb-7 px-2 py-2 w-full border text-l placeholder:text-base'></input>
        <h3 className='text-lg font-medium mb-2'>Password</h3>
        <input type="password" value={password}
        onChange={(e)=>{
          setPassword(e.target.value);
        }}
        required placeholder='password' className='bg-[#eeeeee] rounded mb-7 px-2 py-2 w-full border text-l placeholder:text-base'></input>
        <button className='bg-[#111] text-white font-semibold rounded px-2 py-2 w-full border text-l '>Login</button>
        <p className='text-center'>Join a fleet? <Link to='/captain-register' className='text-blue-600'>Register as a captain</Link></p>
      </form>
      </div>
      <div className="">
        <Link to='/user-login' className='bg-[#ef8b5d] flex items-center justify-center text-white font-semibold rounded px-2 py-2 w-full border text-l mb-5 hover:bg-[#e75f21]' >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
