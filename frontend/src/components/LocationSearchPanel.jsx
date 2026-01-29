import React from 'react'
import { CiLocationOn } from "react-icons/ci";

const LocationSearchPanel = (props) => {
  //sample array location
  const location=[
    "21A, Near MN Stationaries, SKN College, Pune",
    "20E, Near MN Stationaries, SKN College, Pune",
    "22D, Near MN Stationaries, SKN College, Pune",
    "23C, Near MN Stationaries, SKN College, Pune",
    "24B, Near MN Stationaries, SKN College, Pune"
  ]
  return (
    
    <div className='h-screen relative'>
      
      {location.map((elem,index)=>{
        return  <div key={index} 
        onClick={()=>{props.setPanelOpen(false)
          props.setVehiclePanel()}
        }className="flex gap-4 items-centre my-2 justify-start hover:border-2 border-black p-4 rounded-xl">
        <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
          <CiLocationOn/>
        </h2>
        <h4 className="font-medium">{elem}</h4>
      </div>
      })}
       
    </div>
  )
}

export default LocationSearchPanel
