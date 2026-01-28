import React, { useContext, useState } from 'react'
import { UserDataContext } from '../context/ContextUser'

const Home = () => {
  const {user}=useContext(UserDataContext);
  const[pickup,setPickup]=useState('');
  const[destination,setDestination]=useState('');
  const[panelOpen,setPanelOpen]=useState(false);
  return (
    <div className='h-screen relative'>
      <div className="p-5 flex justify-between items-center bg-transparent absolute top-0 w-full z-10">
        <img className='w-16 left-5 top-5'
      src='https://tse3.mm.bing.net/th/id/OIP.mzogwijpMisG1IbuHAWqWAHaCk?pid=Api&P=0&h=180'></img>
      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
        
        {user?.fullname?.firstname?.[0] || "U"}
      </div>
      </div>
      <div className="h-screen w-screen">
        {/*temporary image */}
        <img src="https://miro.medium.com/v2/resize:fit:1280/0*gwMx05pqII5hbfmX.gif" alt="map" className="h-full w-full object-cover" />
      </div>
      <div className=" flex flex-col justify-end position absolute h-screen top-0 w-full ">
       <div className="bg-white h-[30%] p-5 relative">
         <h4 className="text-3xl font-semibold">Find a trip</h4>
       <form className="">
          <div className="absolute left-[22px] top-[80px] bottom-[28px] h-16 w-1  bg-gray-700"></div>

          <div className="relative mt-5">
    <span className="absolute top-1/2 left-4 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full"></span>
    <input
    value={pickup}
    onClick={()=>
      setPanelOpen(true)
    }
    onChange={(e)=>{
      setPickup(e.target.value)
    }}  
      className="bg-[#eee] px-12 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black"
      placeholder="Add a pick-up location"
    />
          </div>

        <div className="relative mt-3">
    <span className="absolute top-1/2 left-4 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
    <input
      value={destination}
      onChange={(e)=>{
        setDestination(e.target.value)
      }}
      className="bg-[#eee] px-12 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black"
      placeholder="Enter your destination"
    />
        </div>
      </form>

       </div>
       <div className="h-[70%] bg-red-500 p-5 hidden"></div>
      </div>
    </div>
  )
}

export default Home
