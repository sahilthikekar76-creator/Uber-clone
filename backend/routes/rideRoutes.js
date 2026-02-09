const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const rideController=require('../controllers/rideController');
const authMiddleware=require('../middleware/authMiddleware');
router.post('/create',
   authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid Destination address'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('invalid car type'),
    rideController.createRide
)


module.exports=router;