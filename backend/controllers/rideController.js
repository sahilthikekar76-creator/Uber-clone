const mapService = require('../services/maps.services');
const rideService = require('../services/rideServices');
const { validationResult } = require('express-validator');
const { getFare } = require("../services/fare.services");
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
            vehicleType
        });

        return res.status(201).json(ride);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};



module.exports.getFare = async (req, res) => {
  try {
    const { pickup, destination } = req.query;

    const fare = await getFare(pickup, destination);

    res.status(200).json(fare);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};