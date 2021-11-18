// Signup Validator

import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const userSigninValidationRules = () => {
    return [
        body('phone').isMobilePhone('any').withMessage('Phone is required & must be valid'),
        body('password').isLength({ min: 5 }).withMessage('Password is reqd and must be greater than 5 chars')
    ];
};

module.exports = {
    userSigninValidationRules
};
