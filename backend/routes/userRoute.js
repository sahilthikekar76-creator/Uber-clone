const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userControllers = require('../controllers/userController');
const authMiddleware=require('../middleware/authMiddleware');
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage('First name must be at least 3 characters long'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  userControllers.registerUser
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  userControllers.loginUser
);
router.get('/profile',authMiddleware.authUser,userControllers.getUserProfile);

router.post('/logout',authMiddleware.authUser,userControllers.logoutUser);


module.exports = router;
