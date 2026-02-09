const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const mapController = require("../controllers/mapController");
const { query } = require("express-validator");

router.get(
  "/get-coordinates",
  authMiddleware.authUser,
  query("address").isString().isLength({ min: 3 }),
  mapController.getCoordinates
);
router.get('/get-distance-time',authMiddleware.authUser,query('origin').isString().isLength({min:3}),
query('destination').isString().isLength({min:3}),mapController.getDistanceTime);

router.get('/get-suggestions',
    query('input').isString().isLength({min:2}),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)

module.exports = router;