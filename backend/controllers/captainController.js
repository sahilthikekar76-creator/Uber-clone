const blackListTokenModel = require('../models/blackListTokenModel');
const captainModel=require('../models/captainModel');
const captainServices=require('../services/captainServices');
const {validationResult}=require('express-validator');
module.exports.registerCaptain=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()});
    }
    const{fullname,email,password,vehicle}=req.body;
    const isCaptainAlreadyExists=await captainModel.findOne({email});
    if(isCaptainAlreadyExists){
        return res.status(400).json({message:"Captain already exists"});
    }
    const hashedPassword=await captainModel.hashPassword(password);

    const captain=await captainServices.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType,
    });
    const token=await captain.generateToken();
    res.status(201).json({token,captain});
}

module.exports.loginCaptain=async(req,res)=>{
     const errors=validationResult(req);
    if(!errors.isEmpty()){
        return 
    }
    const{email,password}=req.body;
    const captain=await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message:"Invalid email or password"});
    }
    const isMatch=await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid password"});
    }
    const token=captain.generateToken();
     res.cookie('token',token,{
        httpOnly:true,
        maxAge:3600000
    })
   res.status(200).json({
    message: 'Login successful',
    token,
    captain
});

}
module.exports.getCaptainProfile=async(req,res)=>{
    res.status(200).json({captain:req.captain});
}
module.exports.logoutCaptain=async(req,res)=>{
     try {
        const token =
            req.cookies?.token ||
            req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'Token not found' });
        }

        await blackListTokenModel.create({ token });

        res.clearCookie('token');

        res.status(200).json({
            message: 'Logout successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Logout failed',
            error: error.message
        });
    }
}