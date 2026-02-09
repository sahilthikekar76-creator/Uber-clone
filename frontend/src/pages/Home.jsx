import React, { useContext, useEffect, useRef, useState } from "react";
import { UserDataContext } from "../context/ContextUser";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SlArrowDown } from "react-icons/sl";

import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import MapView from "../components/MapView";

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
      height: panelOpen ? "75%" : "0%",
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
  /* ---------------- UI ---------------- */

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
      <div className="absolute inset-0 z-0">
                  <MapView />
        </div>

      {/* Bottom search section */}
      <div className="absolute top-0 h-screen w-full flex flex-col  justify-end">
        <div className="bg-white h-[30%] p-5 -mb-10 relative ">
          {panelOpen ? (
            <button onClick={() => setPanelOpen(false)}>
              <SlArrowDown />
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
                onClick={() => setPanelOpen(true)}
                onChange={(e) => setPickup(e.target.value)}
                className="bg-[#eee] px-12 py-2 rounded-lg w-full"
                placeholder="Add a pick-up location"
              />
            </div>

            <div className="relative mt-3">
              <span className="absolute top-1/2 left-4 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-[#eee] px-12 py-2 rounded-lg w-full"
                placeholder="Enter your destination"
              />
            </div>
          </form>
        </div>

        {/* Location search panel */}
        <div ref={panelRef} className="h-[70%] bg-white p-5 overflow-hidden">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={openVehiclePanel}
          />
        </div>
      </div>

      {/* Vehicle panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 w-full bg-white translate-y-full will-change-transform"
      >
        <button
          onClick={() => setVehiclePanel(false)}
          className="w-full flex justify-center py-3"
        >
          <span className="w-10 h-1.5 bg-gray-300 rounded-full"></span>
        </button>

        <VehiclePanel setConfirmedRidePanel={openConfirmedRidePanel} />
      </div>

      {/* Confirmed ride panel */}
      <div
        ref={confirmedRidePanelRef}
        className="fixed bottom-0 w-full bg-white translate-y-full will-change-transform"
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
        className="fixed bottom-0 w-full bg-white translate-y-full will-change-transform"
      >
        <LookingForDriver/>
      </div>
      {/*waiting for a driver */}
          <div ref={waitingForDriverRef}
        className="fixed bottom-0 w-full  bg-white translate-y-full will-change-transform"
      >
        <WaitingForDriver/>
      </div>
    </div>
  );
};

export default Home;
