import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/ContextUser';
import axios from 'axios';
const UserLogin = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const navigate=useNavigate();

  const{user,setUser}=useContext(UserDataContext);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const userData={
      email:email,
      password:password,
    }
    try{
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData);

        const data=response.data;
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem('userToken',data.token);
        navigate('/home');
    }catch(error){
      console.log(error);
    }

    setEmail('');
    setPassword('');
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
      <div className="">
        <img src="https://tse3.mm.bing.net/th/id/OIP.mzogwijpMisG1IbuHAWqWAHaCk?pid=Api&P=0&h=180 " className='w-14  mb-10'></img>
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
        <p className='text-center'>New here? <Link to='/user-register' className='text-blue-600'>Create new Account</Link></p>
      </form>
      </div>
      <div className="">
        <Link to='/captain-login' className='bg-[#6bebab] flex items-center justify-center text-white font-semibold rounded px-2 py-2 w-full border text-l mb-5 hover:bg-[#1fef87]' >Sign in as Captain </Link>
      </div>
    </div>
  )
}

export default UserLogin
