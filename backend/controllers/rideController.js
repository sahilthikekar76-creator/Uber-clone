const mapService = require('../services/maps.services');
const rideService = require('../services/rideServices');
const { validationResult } = require('express-validator');
const { getFare } = require("../services/fare.services");
const {sendMessageToSocketId}=require('../socket');
const rideModel = require('../models/rideModel');
module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
  const pickupCoords = await mapService.getAddressCoordinate(pickup);
  const destinationCoords = await mapService.getAddressCoordinate(destination);

  const ride = await rideService.createRide({
    user: req.user._id,
    pickup: pickupCoords,
    destination: destinationCoords,
    vehicleType,
  });

  // 🔥 Find nearby captains
  const captainsInTheRadius = await mapService.getCaptainsInTheRadius(
    pickupCoords.lat,
    pickupCoords.lng,
    2
  );

  // 🔐 Hide OTP before sending
  ride.otp = "";

  // 👤 Populate user
  const rideWithUser = await rideModel
    .findById(ride._id)
    .populate("user");

  // 📡 Notify captains
  captainsInTheRadius.forEach((captain) => {
    if (captain.socketId) {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    }
  });

  // ✅ SEND RESPONSE AT THE END
  return res.status(201).json(rideWithUser);

} catch (error) {
  return res.status(400).json({ message: error.message });
}
};



module.exports.getFare = async (req, res) => {
  try {
    const { pickup, destination } = req.query;
    const pickupCoords = await mapService.getAddressCoordinate(pickup);
    const destinationCoords = await mapService.getAddressCoordinate(destination);

    const fare = await getFare(pickupCoords, destinationCoords);
    res.status(200).json(fare);
  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};