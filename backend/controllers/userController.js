const userModel=require('../models/userModel');
const userServices=require('../services/userServices');
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const blackListTokenModel=require('../models/blackListTokenModel');
module.exports.registerUser=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    const {fullname,email,password}=req.body;
    const isUserAlredayExists=await userModel.findOne({email});
    if(isUserAlredayExists){
        return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword=await userModel.hashPassword(password);
    const user=await userServices.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    });
    const token=user.generateAuthToken();
    res.status(201).json({token,user});

}
module.exports.loginUser=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    const user=await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message:"Invalid email or password"});
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid passsword"});
    }
    const token=user.generateAuthToken();
    res.cookie('token',token,{
        httpOnly:true,
        maxAge:3600000
    })
    res.status(200).json({
    message: 'Login successful',
    token,
    user
});

}
module.exports.getUserProfile=async(req,res)=>{
    res.status(200).json(req.user);
}
module.exports.logoutUser=async(req,res)=>{
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