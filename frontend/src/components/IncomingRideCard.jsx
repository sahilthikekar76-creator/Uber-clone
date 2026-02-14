import React from "react";
import { MapPin, Navigation } from "lucide-react";

const IncomingRideCard = ({ request, requestCount, onAccept, onDecline }) => {
  const { rider, trip } = request;

  return (
    <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-2xl p-5">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={rider.avatar}
            alt="rider"
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div>
            <h3 className="font-semibold text-sm">{rider.name}</h3>
            <p className="text-xs text-gray-500">
              ⭐ {rider.rating} • {rider.payment}
            </p>
          </div>
        </div>

        <div className="text-xs bg-black text-white px-3 py-1 rounded-full">
          {trip.eta}
        </div>
      </div>

      {/* Trip Info */}
      <div className="space-y-3 mb-5">
        <div className="flex items-start gap-3">
          <MapPin size={16} className="text-green-600 mt-1" />
          <div>
            <p className="text-xs text-gray-500">Pickup</p>
            <p className="text-sm font-medium text-black">{trip.pickup}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Navigation size={16} className="text-red-500 mt-1" />
          <div>
            <p className="text-xs text-gray-500">Drop</p>
            <p className="text-sm font-medium text-black">{trip.drop}</p>
          </div>
        </div>
      </div>

      {/* Fare */}
      <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3 mb-4">
        <p className="text-sm text-gray-600">Trip Fare</p>
        <p className="text-lg font-semibold text-black">
          ₹{trip.fare} <span className="text-xs text-gray-500">• {trip.distance}</span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => onDecline(request.id)}
          className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-600 font-medium hover:bg-gray-100"
        >
          Decline
        </button>

        <button
          onClick={() => onAccept(request)}
          className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900"
        >
          Accept Ride
        </button>
      </div>
    </div>
  );
};

export default IncomingRideCard;