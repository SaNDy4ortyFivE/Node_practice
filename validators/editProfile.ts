import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const userProfileValidationRules = () => {
    return [
        body('name').optional().isString().isLength({ max: 30 }).withMessage('Name is required & length must be smaller than 30'),
        body('phone').optional().isMobilePhone('any').withMessage('Phone is required & must be valid'),
        body('email').optional().optional().isEmail().withMessage('Enter valid email'),
        body('address').optional().isString().withMessage('Address is reqd'),
        body('pincode').optional().isNumeric().isLength({ max: 6 }).withMessage('Pincode is reqd and must be valid')
    ];
};

module.exports = {
    userProfileValidationRules
};
