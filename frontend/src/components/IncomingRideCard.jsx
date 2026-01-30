import React from 'react'

const IncomingRideCard = ({request,requestCount,onAccept,onDecline}) => {
    const {rider,trip}=request;

  return (
    <div className='absolute bottom-0 w-full p-4 bg-white rounded-t-2xl shadow-xl'>
        {/* rider (user) info*/ }
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
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                {trip.eta}
            </span>
        </div>
        {/*trip info */}
        <div className="flex flex-col gap-1 text-sm text-gray-600 mb-4">
            <div className="flex justify-between">
                <p className="">Pickup</p>
                <p className="font-medium text-black">
                    {trip.pickup}
                </p>
            </div>
            <div className="flex justify-between">
                <p className="">Drop</p>
                <p className="font-medium text-black">
                    {trip.drop}
                </p>
            </div>
            <div className="flex justify-between">
                <p className="">Fare</p>
                <p className="font-medium text-black">
                     ₹{trip.fare} • {trip.distance}
                </p>
            </div>
        </div>
         {/* Actions */}
      <div className="flex gap-3">
        <button 
        onClick={()=>onDecline(request.id)} className="flex-1 border border-gray-400 py-2 rounded-lg">
          Decline
        </button>
        <button 
        onClick={()=>onAccept(request)}
        className="flex-1 bg-black text-white py-2 rounded-lg">
          Accept
        </button>
      </div>
    </div>
  )
}

export default IncomingRideCard
