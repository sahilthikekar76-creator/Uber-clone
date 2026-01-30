import React from "react";

const OnlineToggle = ({isOnline,setIsOnline}) => {
  

  return (
    <div
      onClick={() => setIsOnline(!isOnline)}
      className="relative w-12 h-8 rounded-full cursor-pointer transition-colors duration-300 bg-white border  border-black">
      {/* Knob */}
      <div
        className={`absolute top-1 w-6 h-6 bg-black rounded-full shadow-md transition-transform duration-300
        ${isOnline ? "translate-x-5" : "translate-x-1"}`}
      />
    </div>
  );
};
export default OnlineToggle;