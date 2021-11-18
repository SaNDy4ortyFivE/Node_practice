import express, { Request, Response, NextFunction } from 'express';
import {checkToken} from "./middlewares/checkToken"

// import { userSignupValidationRules, validate } from '../validators/signup';
const { userSignupValidationRules, validate } = require('../validators/signup');
const { userSigninValidationRules } = require('../validators/signin');
const { forgetPasswordValidationRules } = require('../validators/forget-password.ts');

// Middleware
const auth = require('../middlewares/auth');

// Controller
const authController = require('../controllers/auth');

const { body } = require('express-validator/check');

const User = require('../models/user');

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log('Auth Testing Route');
});

// done- Token Part remaining
router.put('/signup', userSignupValidationRules(), validate, authController.signup);

// done - Token Part remaining
router.post('/login', userSigninValidationRules(), validate, checkToken, authController.signin);

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    console.log('Auth Logout Route');
});

router.post('/forget-password', forgetPasswordValidationRules(), validate, (req: Request, res: Response, next: NextFunction) => {
    console.log('Auth Forget Password Route');
});

router.post('/reset-password', (req: Request, res: Response, next: NextFunction) => {
    console.log('Auth Reset Password Route');
});

router.post('/send-otp', authController.sendOTP);

router.post('/verify-otp', authController.verifyOTP);

module.exports = router;
