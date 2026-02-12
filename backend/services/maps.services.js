const axios = require("axios");
const captainModel=require('../models/captainModel');
/**
 * Convert address → coordinates (lat, lng)
 * Uses OpenStreetMap Nominatim API
 *
 * @param {string} address
 * @returns {Promise<{lat: number, lng: number, address: string}>}
 */
module.exports.getAddressCoordinate = async (address) => {
  if (!address || address.length < 3) {
    throw new Error("Invalid address");
  }

  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: address,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "Uber-Clone-App", // IMPORTANT for Nominatim
        "Accept-Language": "en",
      },
    }
  );

  if (!response.data || response.data.length === 0) {
    throw new Error("Location not found");
  }

  const location = response.data[0];

  return {
    lat: Number(location.lat),
    lng: Number(location.lon),
    address: location.display_name,
  };
};



/**
 * Get distance & time between two coordinates
 * Uses OSRM (OpenStreetMap routing)
 *
 * @param {{lat:number, lng:number}} origin
 * @param {{lat:number, lng:number}} destination
 * @returns {Promise<{distance:number, duration:number}>}
 */
module.exports.getDistanceTime = async (origin, destination) => {
  if (
    !origin?.lat ||
    !origin?.lng ||
    !destination?.lat ||
    !destination?.lng
  ) {
    throw new Error("Invalid coordinates");
  }

  const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;

  const response = await axios.get(url, {
    params: { overview: false },
  });

  if (!response.data.routes?.length) {
    throw new Error("Route not found");
  }

  const route = response.data.routes[0];

  const distanceMeters = route.distance;     // meters
  const durationSeconds = route.duration;    // seconds

  return {
    distance: {
      text: `${(distanceMeters / 1000).toFixed(2)} km`,
      value: Math.round(distanceMeters),
    },
    duration: {
      text: `${Math.ceil(durationSeconds / 60)} mins`,
      value: Math.round(durationSeconds),
    },
  };
};



/**
 * Get autocomplete location suggestions
 * Uses OpenStreetMap Nominatim
 *
 * @param {string} input
 * @returns {Promise<Array<{place_id:string, description:string}>>}
 */
module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input || input.length < 2) {
    throw new Error("Query is required");
  }

  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: input,
        format: "json",
        addressdetails: 1,
        limit: 5,
      },
      headers: {
        "User-Agent": "Uber-Clone-App", // REQUIRED
        "Accept-Language": "en",
      },
    }
  );

  if (!response.data || response.data.length === 0) {
    return [];
  }

  return response.data.map((place) => ({
    place_id: place.place_id,
    description: place.display_name,
    lat: Number(place.lat),
    lng: Number(place.lon),
  }));
};

module.exports.getCaptainsInTheRadius = async (lat, lng, radiusKm) => {
  const radiusInRadians = radiusKm / 6378;

  return await captainModel.find({
    status: "active",
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radiusInRadians],
      },
    },
  });
};