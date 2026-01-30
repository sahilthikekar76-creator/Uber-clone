import React from 'react'
import { MdOutlineEmergencyShare } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdCall } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { IoSendSharp } from "react-icons/io5";
const WaitingForDriver = () => {
  {/*driver info panel */}
  return (
     <div className=" flex flex-col gap-2 justify-between p-2">
         <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Meet at the pickup point</h2>

            <div className="flex flex-col items-center justify-center bg-black text-white w-12 h-14">
                <span className="text-lg font-semibold leading-none">2</span>
                <span className="text-xs">min</span>
            </div>
        </div>

          <div className="flex justify-between items-center border-t pt-3">
            {/* Driver image */}
            <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            className="w-14 h-14 rounded-full object-cover"
            />

            {/* Driver details */}
              <div className="flex-1 ml-3">
                <p className="text-sm text-gray-500">SANTH</p>
                <h1 className="text-xl font-bold tracking-wide">KA15AK00-0</h1>
                <p className="text-sm text-gray-600">White Suzuki S-Presso LXI</p>

                <div className="flex items-center gap-1">
                  <IoStar className="text-yellow-500 text-sm" />
                  <span className="text-sm font-medium">4.9</span>
                  </div>
                </div>

              {/* Car image */}
                  <img
                  src="https://png.pngtree.com/png-vector/20241121/ourlarge/pngtree-a-realistic-white-car-png-image_14450181.png"
                  className="w-24"
                  />
          </div>
          <div className="mt-3 relative">
            <input
              className=" bg-gray-100 rounded-full px-4 py-2 text-sm"
                placeholder="Send a message..."
            />
             <button className="absolute top-1/2 right-44 -translate-y-1/2 text-gray-500 hover:text-black">
              <IoSendSharp className="" />
             </button>
          </div>

          <div className="w-full flex items-centre  justify-between p-5 border-b-2">
            <div className="flex flex-col items-center">
              <AiFillSafetyCertificate className=' h-8 w-8'/>
                <span className="">Safety</span>
              </div>
              <div className="flex flex-col items-center">
                  <MdOutlineEmergencyShare className=' h-8 w-8'/>
                  <span className="">Share my trip</span>
              </div>
              <div className="flex flex-col items-center">
                    <MdCall className=' h-8 w-8'/>
                    <span className="">Call driver</span>
              </div>
          </div>
          <div className="flex items-center gap-5 p-4 border-b-2">
              <FaLocationDot className='text-xl' />
              <div className="">
                  <h3 className='text-lg font-medium'>562/11-A</h3>
                  <p className="text-sm -mt-1  text-gray-600">sfdfwq dgewui fguuief qwuggfierrwr ukfig2gfdfgd,Pune</p>
              </div>
            </div>
    </div>           
  )
}

export default WaitingForDriver
