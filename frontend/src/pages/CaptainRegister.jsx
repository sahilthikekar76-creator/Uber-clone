import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainRegister = () => {
  const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[lastname,setLastname]=useState('');
    const[firstname,setFirstname]=useState('');
    const[captainData,setCaptainData]=useState({});
    
  const handleSubmit=(e)=>{
    e.preventDefault();
    setCaptainData({
      fullname:{
        firstname:firstname,
        lastname:lastname,
      },
      email:email,
      password:password,
    })
    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
  }
  return (
     <div className='p-7 h-screen flex flex-col justify-between '>
      <div className="">
        <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRu9QNvM8_gANe0dGGCtqSuGH-7UueXlYROMGquTf75auAZTtxQ" className='w-14  mb-10'></img>
      <form onSubmit={handleSubmit} className="">
        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
        <div className='flex gap-5 mb-5'>
          <input type="text" value={firstname} 
        onChange={(e)=>{
          setFirstname(e.target.value);
        }}
        required placeholder='firstname' className='bg-[#eeeeee] rounded px-2 py-2 w-1/2 border text-base placeholder:text-sm'></input>
        <input type="text" value={lastname} 
        onChange={(e)=>{
          setLastname(e.target.value);
        }}
        required placeholder='lastname' className='bg-[#eeeeee] rounded  px-2 py-2 w-1/2 border text-base placeholder:text-sm'></input>
        </div>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input type="email" value={email} 
        onChange={(e)=>{
          setEmail(e.target.value);
        }}
        required placeholder='email@gmail.com' className='bg-[#eeeeee] rounded mb-5 px-2 py-2 w-full border text-base placeholder:text-sm'></input>
        <h3 className='text-lg font-medium mb-2'>Password</h3>
        <input type="password" value={password}
        onChange={(e)=>{
          setPassword(e.target.value);
        }}
        required placeholder='password' className='bg-[#eeeeee] rounded mb-5 px-2 py-2 w-full border text-base placeholder:text-sm'></input>
        <button className='bg-[#111] text-white font-semibold rounded px-2 py-2 w-full border text-l '>Create Account</button>
        <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </form>
      </div>
      <div className="">
       <p className="text-[10px] leading-tight">
        This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
        Policy </span>and <span className='underline'>Terms of Service apply</span>.
       </p>
      </div>
    </div>
  )
}

export default CaptainRegister
