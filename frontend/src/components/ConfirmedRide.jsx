import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMoneyCheck } from "react-icons/fa6";
const ConfirmedRide=({confirmedVehicle})=>{
    return(
        <div className="">
            <div className="flex gap-2 flex-col justify-between items-center p-2">
                <img src="https://png.pngtree.com/png-vector/20241121/ourlarge/pngtree-a-realistic-white-car-png-image_14450181.png" alt="" className="h-32 w-44" />
                <div className="w-full">
                    <div className="flex items-center gap-5 p-4 border-t-2">
                        <FaLocationDot className='text-xl' />
                        <div className="">
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className="text-sm -mt-1  text-gray-600">sfdfwq dgewui fguuief qwuggfierrwr ukfig2gfdfgd,Pune</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-4 border-t-2">
                        <MdOutlineLocationCity  className='text-xl'/>
                        <div className="">
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className="text-sm -mt-1  text-gray-600">Kankariya Talab,Near gfhdgda edghdjwgh dwhggh,Pune</p>
                        </div>   
                    </div>
                    <div className="flex items-center gap-5 p-4 border-t-2">
                         <FaMoneyCheck  className='text-xl' />
                        <div className="">
                            <h3 className='text-lg font-medium'>185</h3>
                            <p className="text-sm -mt-1  text-gray-600">Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={confirmedVehicle} className="w-full bg-green-500 text-center text-white font-semibold p-3 rounded-lg mb-2 mx-4">Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmedRide;