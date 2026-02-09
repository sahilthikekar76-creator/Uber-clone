import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { MdOutlineTurnRight } from "react-icons/md";
import MapView from "./MapView";

const PickupNavigationScreen = ({ ride, onArrived }) => {
  const { trip } = ride;

  return (
    <div className="absolute inset-0 z-40 bg-white flex flex-col">
      <div className="border-b flex items-center justify-between px-4 py-3">
              <GoArrowLeft className="text-2xl text-gray-700 cursor-pointer" />
              <h2 className="text-lg font-semibold text-gray-800">
                Pick up
              </h2>
              <div className="w-6" />
        </div>
      {/* TOP NAV INFO */}
      <div className="bg-[#FF9F00] px-4 py-3 flex items-center justify-between">
        
        <div className="flex items-center justify-center gap-2">
            <MdOutlineTurnRight className="text-2xl" />
          <p className="text-sm font-semibold">
            250 m •
          </p>
          
        </div>
        <p className="text-sm text-gray-700">
             Turn right at 105 William St
            Chicago, US
          </p>
      </div>

      {/* MAP PLACEHOLDER */}
      <div className="flex-1">
       <MapView/>
      </div>

      {/* PICKUP CARD */}
      <div className="bg-white p-4 shadow-xl rounded-t-2xl">
        <p className="text-xs text-gray-400 mb-1">Pickup</p>
        <p className="text-base font-semibold mb-2">
          {trip.pickup}
        </p>

        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span>ETA: 5 min</span>
          <span>{trip.distance}</span>
          <span>₹{trip.fare}</span>
        </div>

        <button
          onClick={onArrived}
          className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold active:scale-95 transition"
        >
          Arrived at Pickup
        </button>
      </div>
    </div>
  );
};

export default PickupNavigationScreen;
