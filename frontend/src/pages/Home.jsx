import React, { useContext, useEffect, useRef, useState } from "react";
import { UserDataContext } from "../context/ContextUser";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import MapView from "../components/MapView";
import api from '../utils/axios';
const Home = () => {
  const { user } = useContext(UserDataContext);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  // panel state (only one active at a time)
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const [lookingForDriverPanel,setLookingForDriverPanel] = useState(false);
  const [waitingForDriverPanel,setWaitingForDriverPanel] = useState(false);

  const [activeField, setActiveField] = useState(null);
 const [fare, setFare] = useState(null);
  const [distanceTime, setDistanceTime] = useState(null);

  // refs
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);
  const lookingForDriverRef=useRef(null);
  const waitingForDriverRef=useRef(null);
  const submitHandler = (e) => e.preventDefault();

  /* ---------------- GSAP ANIMATIONS ---------------- */

  // Location search panel
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "70%" : "0%",
      duration: 0.5,
      ease: "power2.out",
    });
  }, { dependencies: [panelOpen] });

  // Vehicle panel
  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, { dependencies: [vehiclePanel] });

  // Confirmed ride panel
  useGSAP(() => {
    gsap.to(confirmedRidePanelRef.current, {
      transform: confirmedRidePanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, { dependencies: [confirmedRidePanel] });
  //looking for a driver panel
   useGSAP(() => {
    gsap.to(lookingForDriverRef.current, {
      transform: lookingForDriverPanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, { dependencies: [lookingForDriverPanel] });
  //drriver info panel
  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriverPanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, { dependencies: [waitingForDriverPanel] });

  /* ---------------- PANEL HELPERS ---------------- */

  const openVehiclePanel = () => {
    setPanelOpen(false);
    setConfirmedRidePanel(false);
    setVehiclePanel(true);
  };

  const openConfirmedRidePanel = () => {
    setVehiclePanel(false);
    setConfirmedRidePanel(true);
  };
  const openDriverLookingPanel = () => {
    setConfirmedRidePanel(false);
    setLookingForDriverPanel(true);
  };
  const openDriverInfoPanel=()=>{
    setLookingForDriverPanel(false);
    setWaitingForDriverPanel(true);
  };
  useEffect(()=>{
    if(!lookingForDriverPanel)return;
    const timer=setTimeout(()=>{
    openDriverInfoPanel();
  },5000);
  return () => clearTimeout(timer);
  },[lookingForDriverPanel])

  const findTrip = async () => {
  if (!pickup || !destination) return;

  const distanceRes = await api.get(
    `/maps/get-distance-time?origin=${pickup}&destination=${destination}`
  );

  const fareRes = await api.get(
    `/rides/get-fare?pickup=${pickup}&destination=${destination}`
  );

  setDistanceTime(distanceRes.data);
  setFare(fareRes.data);
  openVehiclePanel();
};
  return (
    <div className="h-screen relative overflow-hidden">
      {/* Top bar */}
      <div className="p-5 flex justify-between items-center absolute top-0 w-full z-10">
        <img
          className="w-16"
          src="https://tse3.mm.bing.net/th/id/OIP.mzogwijpMisG1IbuHAWqWAHaCk?pid=Api&P=0&h=180"
          alt="logo"
        />
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
          {user?.fullname?.firstname?.[0] || "U"}
        </div>
      </div>

      {/* Map */}
      <div className="absolute inset-0 z-0 ">
                  <MapView />
        </div>

      {/* Bottom search section */}
      <div className="absolute top-0 h-screen w-full flex flex-col  justify-end pointer-events-none">
        <div className="bg-white h-[33%] p-5 -mb-10 relative pointer-events-auto ">
          {panelOpen ? (
            <button type='button'
          onClick={() => 
            setPanelOpen(false)}
          className="w-full flex justify-center py-3"
        >
          <span className="w-10 h-1.5 bg-gray-300 rounded-full"></span>
        </button>
          ) : (
            <h4 className="text-3xl font-semibold">Find a trip</h4>
          )}

          <form onSubmit={submitHandler}>
            <div className="absolute left-[22px] top-[80px] bottom-[28px] w-1 bg-gray-700"></div>

            <div className="relative mt-5">
              <span className="absolute top-1/2 left-4 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full"></span>
              <input
                value={pickup}
                 onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                onChange={(e) => setPickup(e.target.value)}
                className="bg-[#eee] px-12 py-2 rounded-lg w-full"
                placeholder="Add a pick-up location"
              />
            </div>

            <div className="relative mt-3">
              <span className="absolute top-1/2 left-4 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              <input
                value={destination}
                 onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-[#eee] px-12 py-2 rounded-lg w-full"
                placeholder="Enter your destination"
              />
            </div>
                <button
                  type="button"
                  disabled={!pickup || !destination}
                  onClick={findTrip}
                  className={`mt-4 w-full py-2 rounded-lg text-white
                    ${pickup && destination ? "bg-black" : "bg-gray-400 cursor-not-allowed"}`}
                >
                  Find Trip
                </button>
          </form>
      
        </div>

        {/* Location search panel */}
        <div ref={panelRef} className="h-[70%] bg-white p-5 overflow-hidden  pointer-events-auto">
          <LocationSearchPanel
              query={activeField === "pickup" ? pickup : destination}
              setSelectedLocation={(value) => {
                activeField === "pickup"
                  ? setPickup(value)
                  : setDestination(value);
              }}
              
          />
        </div>
      </div>

      {/* Vehicle panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 w-full bg-white translate-y-full will-change-transform  pointer-events-auto"
      >
        <button
          onClick={() => setVehiclePanel(false)}
          className="w-full flex justify-center py-3"
        >
          <span className="w-10 h-1.5 bg-gray-300 rounded-full"></span>
        </button>

        <VehiclePanel
          fare={fare}
          distanceTime={distanceTime}
          setConfirmedRidePanel={openConfirmedRidePanel}
        />
      </div>

      {/* Confirmed ride panel */}
      <div
        ref={confirmedRidePanelRef}
        className="fixed bottom-0 w-full bg-white translate-y-full will-change-transform  pointer-events-auto"
      >
        <button
          onClick={() => setConfirmedRidePanel(false)}
          className="w-full flex justify-center py-3"
        >
          <span className="w-10 h-1.5 bg-gray-300 rounded-full"></span>
        </button>

        <ConfirmedRide confirmedVehicle={openDriverLookingPanel} />
      </div>
          {/*looking for a driver */}
          <div
          ref={lookingForDriverRef}
        className="fixed bottom-0 w-full bg-white translate-y-full will-change-transform  pointer-events-auto"
      >
        <LookingForDriver/>
      </div>
      {/*waiting for a driver */}
          <div ref={waitingForDriverRef}
        className="fixed bottom-0 w-full  bg-white translate-y-full will-change-transform  pointer-events-auto"
      >
        <WaitingForDriver/>
      </div>
    </div>
  );
};

export default Home;
