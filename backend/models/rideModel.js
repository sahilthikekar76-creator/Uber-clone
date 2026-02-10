const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
    {
        address: { type: String, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    { _id: false }
);

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain'
    },

    pickup: {
        type: locationSchema,
        required: true
    },

    destination: {
        type: locationSchema,
        required: true
    },

    vehicleType: {
        type: String,
        enum: ['auto', 'car', 'motorcycle'],
        required: true
    },

    fare: {
        type: Number,
        required: true
    },

    distance: {
        text: String,
        value: Number
    },

    duration: {
        text: String,
        value: Number
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },

    paymentId: String,
    orderId: String,
    signature: String,
    otp:{
        type:String,
        select:false,
        required:true
    }

}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);