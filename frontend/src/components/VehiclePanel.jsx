import React from 'react'
import { FaRegUser } from "react-icons/fa6";
const VehiclePanel = (props) => {
  return (
    <div>
        <div  onClick={()=>props.setConfirmedRidePanel()} className="flex px-3 py-6 mt-3  items-center justify-between w-full rounded-xl hover:border-2 border-black">
          <img src="https://png.pngtree.com/png-vector/20241121/ourlarge/pngtree-a-realistic-white-car-png-image_14450181.png" alt="" className="h-16" />
          <div className="w-1/2 ">
            <h4 className="flex items-center gap-2 text-lg font-semibold">
                UberGo
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <FaRegUser />
                  4
                </span>
            </h4>

            <h5 className="font-medium text-sm">2 mins away 15:24</h5>
            <p className="font-xl text-xs text-gray-600">Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>193.20</h2>
        </div>
        <div onClick={()=>props.setConfirmedRidePanel()} className="flex px-3 py-6 mt-3  items-center justify-between w-full rounded-xl hover:border-2 border-black">
          <img src="https://tse2.mm.bing.net/th/id/OIP.nojLg57TpNrPh7SMDxGQOgHaHa?pid=Api&P=0&h=180" alt="" className="h-16" />
          <div className="w-1/2 ">
            <h4 className="flex items-center gap-2 text-lg font-semibold">
                Moto
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <FaRegUser />
                  1
                </span>
            </h4>

            <h5 className="font-medium text-sm">2 mins away 15:24</h5>
            <p className="font-xl text-xs text-gray-600">Affordable motorcycle rides</p>
          </div>
          <h2 className='text-lg font-semibold'>65</h2>
        </div>
        <div  onClick={()=>props.setConfirmedRidePanel()} className="flex px-3 py-6 mt-3  items-center justify-between w-full rounded-xl hover:border-2 border-black">
          <img src="https://p7.hiclipart.com/preview/185/46/346/bajaj-auto-auto-rickshaw-car-bajaj-qute-auto-rickshaw.jpg" alt="" className="h-14" />
          <div className="w-1/2 ">
            <h4 className="flex items-center gap-2 text-lg font-semibold">
                UberAuto
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <FaRegUser />
                  3
                </span>
            </h4>

            <h5 className="font-medium text-sm">2 mins away 15:24</h5>
            <p className="font-xl text-xs text-gray-600">Affordable rides</p>
          </div>
          <h2 className='text-lg font-semibold'>92.80</h2>
        </div>
    </div>
  )
}

export default VehiclePanel
