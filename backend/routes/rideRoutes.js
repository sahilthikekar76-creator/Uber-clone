const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator"); 
const rideController = require("../controllers/rideController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup").isString().isLength({ min: 3 }),
  body("destination").isString().isLength({ min: 3 }),
  body("vehicleType").isIn(["auto", "car", "motorcycle"]),
  rideController.createRide
);

router.get(
  "/get-fare",
  query("pickup").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  rideController.getFare
);

module.exports = router;