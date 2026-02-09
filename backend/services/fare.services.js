const mapService = require("./maps.services");

const RATES = {
  auto: {
    base: 30,
    perKm: 12,
    perMin: 1,
  },
  motorcycle: {
    base: 20,
    perKm: 8,
    perMin: 0.8,
  },
  car: {
    base: 50,
    perKm: 18,
    perMin: 1.5,
  },
};

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(
    pickup,
    destination
  );

  const distanceInKm = distanceTime.distance.value / 1000;
  const durationInMin = distanceTime.duration.value / 60;

  const calculate = (type) => {
    const rate = RATES[type];

    const fare =
      rate.base +
      distanceInKm * rate.perKm +
      durationInMin * rate.perMin;

    return Math.round(fare);
  };

  return {
    auto: {
      fare: calculate("auto"),
      distance: distanceTime.distance,
      duration: distanceTime.duration,
    },
    motorcycle: {
      fare: calculate("motorcycle"),
      distance: distanceTime.distance,
      duration: distanceTime.duration,
    },
    car: {
      fare: calculate("car"),
      distance: distanceTime.distance,
      duration: distanceTime.duration,
    },
  };
}

module.exports = { getFare };