const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: 3,
    },
    lastname: {
      type: String,
      minLength: 3,
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  socketId: String,

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  vehicle: {
    color: String,
    plate: String,
    capacity: Number,
    vehicleType: {
      type: String,
      enum: ["car", "motorcycle", "auto"],
    },
  },

  // 🔥 GEO LOCATION (THIS IS THE KEY)
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },
  stats:{
    totalTrips:{
      type:Number,
      default:0,
    },
    totalDistance: {
    type: Number,
    default: 0, // in KM
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
  },
});

/* 🔥 REQUIRED FOR GEO QUERIES */
captainSchema.index({ location: "2dsphere" });

/* AUTH HELPERS */
captainSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

captainSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model("captain", captainSchema);