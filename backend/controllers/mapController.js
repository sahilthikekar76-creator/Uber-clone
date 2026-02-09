const mapService = require("../services/maps.services");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ message: error.message });
  }
};

module.exports.getDistanceTime = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    // 1️⃣ Convert address → coordinates
    const originCoords = await mapService.getAddressCoordinate(origin);
    const destinationCoords = await mapService.getAddressCoordinate(destination);

    // 2️⃣ Get distance & time
    const distanceTime = await mapService.getDistanceTime(
      originCoords,
      destinationCoords
    );

    res.status(200).json(distanceTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res) => {
  try {
    const { input } = req.query;

    if (!input) {
      return res.status(400).json({ message: "input query is required" });
    }

    const suggestions =
      await mapService.getAutoCompleteSuggestions(input);

    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Autocomplete error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};