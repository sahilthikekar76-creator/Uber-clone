const Ride = require('../models/rideModel');
const { getFare } = require('./fare.services');

module.exports.createRide = async ({
    user,
    pickup,
    destination,
    vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fareData = await getFare(pickup, destination);

    const selectedFare = fareData[vehicleType]; 
     if (!selectedFare) {
    throw new Error(`Invalid vehicle type: ${vehicleType}`);
  }
    const ride = await Ride.create({
        user,
        pickup,
        destination,
        vehicleType,

        // ✅ correct fields
        fare: selectedFare.fare,
        distance: selectedFare.distance,
        duration: selectedFare.duration
    });

    return ride;
};