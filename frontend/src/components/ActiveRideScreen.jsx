import React, { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { LuPhoneCall, LuMessageCircleMore, LuTrash2 } from "react-icons/lu";
import PickupNavigationScreen from "./PickupNavigationScreen";
import toast from 'react-hot-toast';
import TripInProgress from "./TripInProgress";
const ActiveRideScreen = ({ ride, onCancel }) => {
    const [showPickupNav, setShowPickupNav] = useState(false);
    const [status, setStatus] = useState("accepted");
  const { rider, trip } = ride;
  useEffect(()=>{
    if(status === "accepted") toast.success("Heading to pickup");
    if(status === "arrived")toast.success("Waiting for rider");
    if(status === "started")toast.success("Trip in progress");
  },[status])
  return (
    <div className="absolute inset-0 z-40 bg-white flex flex-col">
      {/* HEADER */}
      <div className="border-b-2 p-2">
  <div className="flex items-center justify-between">
    <GoArrowLeft className="text-3xl font-semibold" />
    <h2 className="text-2xl font-medium">#{ride.id}</h2>
    <div></div>
  </div>

    

      </div>
      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* RIDER CARD */}
        {status!=="started" &&(<>
        <div className="mx-4 mt-4 bg-gray-50 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={rider.avatar}
              alt="rider"
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {rider.name}
              </h3>
              <p className="text-sm text-gray-500">
                ⭐ {rider.rating} • {rider.payment}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              ₹{trip.fare}
            </p>
            <p className="text-xs text-gray-500">{trip.distance}</p>
          </div>
        </div>

        {/* PICKUP & DROP */}
        <div className="mx-4 mt-5 space-y-4">
          <div>
            <p className="text-xs uppercase text-gray-400">Pickup</p>
            <p className="text-base font-medium text-gray-900">
              {trip.pickup}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-gray-400">Drop off</p>
            <p className="text-base font-medium text-gray-900">
              {trip.drop}
            </p>
          </div>
        </div>

        {/* NOTES */}
        <div className="mx-4 mt-4 bg-yellow-50 rounded-lg p-3">
          <p className="text-xs uppercase text-gray-500 mb-1">Notes</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Please come near the main gate. Rider has luggage.
          </p>
        </div>

        {/* FARE BREAKDOWN */}
        <div className="mx-4 mt-4 border-t pt-3 space-y-2">
          <p className="text-xs uppercase text-gray-400">Trip Fare</p>

          <div className="flex justify-between text-sm">
            <span>App pay</span>
            <span>₹15</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Discount</span>
            <span>-₹5</span>
          </div>

          <div className="flex justify-between font-semibold">
            <span>Paid amount</span>
            <span>₹{trip.fare}</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mx-4 mb-6 mt-8 flex gap-4">
          <button className="flex-1 h-16 bg-green-500 rounded-xl flex flex-col items-center justify-center active:scale-95 transition">
            <LuPhoneCall className="text-white text-xl" />
            <span className="text-white text-sm">Call</span>
          </button>

          <button className="flex-1 h-16 bg-blue-500 rounded-xl flex flex-col items-center justify-center active:scale-95 transition">
            <LuMessageCircleMore className="text-white text-xl" />
            <span className="text-white text-sm">Message</span>
          </button>

          <button
            onClick={onCancel}
            className="flex-1 h-16 bg-gray-700 rounded-xl flex flex-col items-center justify-center active:scale-95 transition"
          >
            <LuTrash2 className="text-white text-xl" />
            <span className="text-white text-sm">Cancel</span>
          </button>
        </div> 
        </>)}
      </div>

      {/* BOTTOM CTA */}
      {status!=="started" &&(<div className="fixed bottom-0 left-0 w-full bg-yellow-400 p-4">
        <button 
         onClick={()=>{
            if(status==="accepted"){
               setShowPickupNav(true) 
            }else if(status==="arrived"){
                setStatus("started")
            }
         }
        }
        className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold active:scale-95 transition">
            {status === "accepted" && "Go to Pickup"}
            {status === "arrived" && "Start Trip"}
        </button>
      </div>)}
     
      {showPickupNav &&(
        <PickupNavigationScreen ride={ride}
        onArrived={()=>{
            setShowPickupNav(false)
            setStatus("arrived")
        }
            
        }/>
      )}
      {status === "started" && (
    <TripInProgress
      ride={ride}
      onEndTrip={() => {
        toast.success("Trip completed 🎉");
        onCancel();
      }}
    />
  )}
    </div>
  );
};

export default ActiveRideScreen;
