const userModel=require('../models/userModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const captainModel = require('../models/captainModel');
const blackListTokenModel = require('../models/blackListTokenModel');

module.exports.authUser = async (req, res, next) => {
    try {
        let token;

        // 1️⃣ From Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        // 2️⃣ From cookies
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const isBlacklisted=await blackListTokenModel.findOne({token:token});
        if(isBlacklisted){
            return res.status(401).json({message:"Unauthorised"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports.authCaptain = async (req, res, next) => {
    try {
        let token;

        //  From Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        // From cookies
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const isBlacklisted=await blackListTokenModel.findOne({token:token});
        if(isBlacklisted){
            return res.status(401).json({message:"Unauthorised"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const captain = await captainModel.findById(decoded._id).select('-password');
        if (!captain) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.captain = captain;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
