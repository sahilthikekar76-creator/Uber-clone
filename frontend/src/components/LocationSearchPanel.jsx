import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import api from "../utils/axios";

const LocationSearchPanel = ({
  query,
  setSelectedLocation,
 
}) => {
  const [locations, setLocations] = useState([]); // ✅ always array

  useEffect(() => {
    console.log("Autocomplete query:", query);

    if (!query || query.length < 2) {
      setLocations([]); // ✅ reset safely
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await api.get(
          `/maps/get-suggestions?input=${query}`
        );

        console.log("Suggestions response:", res.data);

        // ✅ FIX IS HERE
        setLocations(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Autocomplete error:", err);
        setLocations([]); // ✅ prevent crash
      }
    };

    fetchSuggestions();
  }, [query]);

  return (
    <div>
      {locations.map((loc, index) => (
        <div
          key={loc.place_id || index}
          onClick={() => {
            setSelectedLocation(loc.description);
            
          }}
          className="flex gap-4 items-center my-2 p-4 rounded-xl hover:border cursor-pointer"
        >
          <span className="bg-[#eee] p-2 rounded-full">
            <CiLocationOn />
          </span>
          <h4 className="font-medium">{loc.description}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;