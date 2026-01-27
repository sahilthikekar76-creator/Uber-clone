import React from 'react'
import { Link } from 'react-router-dom'

const Start= () => {
  return (
    <div>
        <div className='bg-cover h-screen w-full flex flex-col justify-between  pt-8  bg-red-400 '
        style={{backgroundImage:"url('/bgimage.jpg')" }}>
            <img src="https://tse3.mm.bing.net/th/id/OIP.mzogwijpMisG1IbuHAWqWAHaCk?pid=Api&P=0&h=180 " className='w-14 ml-9'></img>
            <div className='py-5 px-10 pb-7 bg-white'>
              <h2 className='text-2xl font-bold'>Get Started With Uber</h2>
              <Link to='/user-login' className='flex items-center justify-center 
              bg-black text-white rounded py-3 mt-2 w-full'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start
