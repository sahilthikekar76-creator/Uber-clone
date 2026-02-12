import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/ContextCaptain'
import { CiClock2 } from "react-icons/ci";
import { IoSpeedometerOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { BsMoonStars } from "react-icons/bs";
import OnlineToggle from '../components/OnlineToggle';
import IncomingRideCard from '../components/IncomingRideCard';
import ActiveRideScreen from '../components/ActiveRideScreen';
import MapView from '../components/MapView';
import { SocketContext } from '../context/SocketContext';
const CaptainHome = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);
const [activeRide, setActiveRide] = useState(null);
const [isOnline, setIsOnline] = useState(false);
  const{captain}=useContext(CaptainDataContext);
  const{socket}=useContext(SocketContext);
  useEffect(() => {
  if (!captain?._id) return;

  // 🔗 join socket
  socket.emit("join", {
    userType: "captain",
    userId: captain._id,
  });

  const updateLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        
        socket.emit("update-location-captain", {
          userId: captain._id,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  // ⏱ update every 5 seconds (BEST PRACTICE)
  updateLocation(); // initial call
  const locationInterval = setInterval(updateLocation, 5000);

  return () => clearInterval(locationInterval);
}, [captain?._id]);

useEffect(() => {
  socket.on("new-ride", (ride) => {
    console.log("New ride received:", ride);

    setIncomingRequests((prev) => [...prev, ride]);
  });

  return () => {
    socket.off("new-ride");
  };
}, []);

  
 
const handleAcceptRide = (ride) => {
  setActiveRide(ride);
  setIncomingRequests([]); 
};
const handleDeclineRide = (rideId) => {
  setIncomingRequests((prev) =>
    prev.filter((r) => r._id !== rideId)
  );
};
  return (
    <div className="h-screen relative overflow-hidden">
          {/* Top Wrapper */}
      <div className="absolute top-0 w-full z-20">

        {/* White Header */}
        <div className="p-2 flex justify-between items-center bg-white shadow-sm">
        <img
          className="w-16"
          src="https://tse3.mm.bing.net/th/id/OIP.mzogwijpMisG1IbuHAWqWAHaCk?pid=Api&P=0&h=180"
          alt="logo"
        />
        <h2 className="text-lg font-semibold">{isOnline?"Online":"Offline"}</h2>
            {/* Toggle will go here*/} 
            <OnlineToggle isOnline={isOnline} setIsOnline={setIsOnline}/>

        
        </div>

        {/* Status Banner */}
        <div className="flex gap-3 px-4 py-2 bg-[#FF9F00]">
          {!isOnline&&<>
            <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center">
              <BsMoonStars className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-semibold">You are offline!</h2>
              <p className="text-sm text-gray-700">
                Go online to start accepting jobs.
              </p>
            </div>
          </>}
          {isOnline && incomingRequests.length === 0 && (
            <p className="text-sm font-semibold text-gray-700">
            Waiting for ride requests...
          </p>
          )}

          {isOnline && incomingRequests.length > 0 && (
            <p className="text-sm font-semibold text-gray-700">
            You have {incomingRequests.length} new request(s)
            </p>
          )}
          
        </div>

      </div>

    
         {/* Map Background */}
          <div className="absolute inset-0 z-0">
            <MapView />
          </div>
          {/* Bottom section */}
          {!isOnline && <div className="absolute top-0 h-screen w-full flex flex-col  justify-end pointer-events-none ">
            <div className="bg-white  h-[35%] p-3 -mb-10 relative flex flex-col gap-4 pointer-events-auto">
               <div className="flex items-center justify-between">
                <div className="flex items-centre gap-2">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    className="w-14 h-14 rounded-full object-cover"
                />
                <div className="">
                  <h2 className="text-lg font-semibold">Santh Saxsena</h2>
                  <p className="text-sm text-gray-500">Basic Level</p>
                </div>

                </div>
             <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">₹1,240</p>
                    <p className="text-sm text-gray-500">Earned</p> 
                </div>
               </div>
              <div className="flex items-center justify-between rounded-lg bg-[#FFD400] text-black p-1 ">
                <div className="text-center flex flex-col items-center ">
                  <CiClock2 className='text-gray-400 h-8 w-8'/>
                  <div className="">
                    <p className="text-lg font-semibold">10.2</p>
                    <p className="text-sm text-gray-500">Hours Online</p>
                  </div>   
                </div>
                <div className="text-center flex flex-col items-center ">
                  <IoSpeedometerOutline className='text-gray-400 h-8 w-8'/>
                  <div className="">
                    <p className="text-lg font-semibold">30KM</p>
                  <p className="text-sm text-gray-500">Total Distance</p>
                  </div>
                </div>
                <div className="text-center flex flex-col items-center ">
                  <CgNotes className='text-gray-400 h-8 w-8'/>
                  <div className="">
                    <p className="text-lg font-semibold">20</p>
                  <p className="text-sm text-gray-500">Total Trips</p>  
                  </div>
                </div>
              </div>
            </div>
          </div>}

          {isOnline && incomingRequests.length > 0 && (
              <IncomingRideCard
                request={incomingRequests[0]}
                requestCount={incomingRequests.length}
                onAccept={handleAcceptRide}
                onDecline={handleDeclineRide}
              />
          )}
          {
            activeRide && (
              <ActiveRideScreen ride={activeRide}
              onCancel={()=>setActiveRide(null)}/>
            )
          }
          
          
  </div>
    
        
  )
}

export default CaptainHome
