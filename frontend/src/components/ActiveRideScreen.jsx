import React from 'react'

const ActiveRideScreen = ({ride,onCancel}) => {
    const{rider,trip}=ride;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
                <img src={rider.avatar} alt="rider" className="w-12 h-12 rounded-full object-cover" />
                <div className="">
                    <h3 className="font-semibold text-sm">
                        {rider.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                       ⭐ {rider.rating} • {rider.payment}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <h2 className="text-lg font-semibold">{trip.fare}</h2>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                {trip.distance}
            </span>
            </div>
        </div>
    </div>
  )
}

export default ActiveRideScreen
