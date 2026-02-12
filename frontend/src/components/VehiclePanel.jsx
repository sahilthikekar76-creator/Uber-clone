import React from "react";
import { FaRegUser } from "react-icons/fa6";

const VehiclePanel = ({ fare, distanceTime, setConfirmedRidePanel ,selectedVehicle,setSelectedVehicle}) => {
  if (!fare || !distanceTime) {
    return (
      <div className="p-6 text-center text-gray-500">
        Calculating fare...
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">

      {/* CAR */}
      <div
        onClick={() => {
      setSelectedVehicle({
      type: "car",
      fare: fare.car.fare,
      image: "https://png.pngtree.com/png-vector/20241121/ourlarge/pngtree-a-realistic-white-car-png-image_14450181.png"
    });
    setConfirmedRidePanel();
  }}

        className="flex items-center justify-between p-4 rounded-xl border hover:border-black cursor-pointer"
      >
        <img
          src="https://png.pngtree.com/png-vector/20241121/ourlarge/pngtree-a-realistic-white-car-png-image_14450181.png"
          className="h-14"
          alt="car"
        />
        <div className="w-1/2">
          <h4 className="flex items-center gap-2 font-semibold">
            UberGo <FaRegUser /> 4
          </h4>
          <p className="text-sm text-gray-600">
            {fare.car.distance.text} • {fare.car.duration.text}
          </p>
        </div>
        <h2 className="font-semibold">₹{fare.car.fare}</h2>
      </div>

      {/* MOTO */}
      <div
        onClick={() => {
      setSelectedVehicle({
      type: "motorcycle",
      fare: fare.motorcycle.fare,
      image: "https://tse2.mm.bing.net/th/id/OIP.nojLg57TpNrPh7SMDxGQOgHaHa?pid=Api"
    });
    setConfirmedRidePanel();
  }}

        className="flex items-center justify-between p-4 rounded-xl border hover:border-black cursor-pointer"
      >
        <img
          src="https://tse2.mm.bing.net/th/id/OIP.nojLg57TpNrPh7SMDxGQOgHaHa?pid=Api"
          className="h-14"
          alt="moto"
        />
        <div className="w-1/2">
          <h4 className="flex items-center gap-2 font-semibold">
            Moto <FaRegUser /> 1
          </h4>
          <p className="text-sm text-gray-600">
            {fare.motorcycle.distance.text} • {fare.motorcycle.duration.text}
          </p>
        </div>
        <h2 className="font-semibold">₹{fare.motorcycle.fare}</h2>
      </div>

      {/* AUTO */}
      <div
       onClick={() => {
    setSelectedVehicle({
      type: "auto",
      fare: fare.auto.fare,
      image: "https://p7.hiclipart.com/preview/185/46/346/bajaj-auto-auto-rickshaw-car-bajaj-qute-auto-rickshaw.jpg"
    });
    setConfirmedRidePanel();
  }}

        className="flex items-center justify-between p-4 rounded-xl border hover:border-black cursor-pointer"
      >
        <img
          src="https://p7.hiclipart.com/preview/185/46/346/bajaj-auto-auto-rickshaw-car-bajaj-qute-auto-rickshaw.jpg"
          className="h-14"
          alt="auto"
        />
        <div className="w-1/2">
          <h4 className="flex items-center gap-2 font-semibold">
            UberAuto <FaRegUser /> 3
          </h4>
          <p className="text-sm text-gray-600">
            {fare.auto.distance.text} • {fare.auto.duration.text}
          </p>
        </div>
        <h2 className="font-semibold">₹{fare.auto.fare}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;