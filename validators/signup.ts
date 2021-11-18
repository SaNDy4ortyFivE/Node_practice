// Signup Validator

import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const userSignupValidationRules = () => {
    return [
        body('name').isString().isLength({ max: 30 }).withMessage('Name is required & length must be smaller than 30'),
        body('phone').isMobilePhone('any').withMessage('Phone is required & must be valid'),
        body('email').optional().isEmail().withMessage('Enter valid email'),
        body('address').isString().withMessage('Address is reqd'),
        body('pincode').isNumeric().isLength({ max: 6 }).withMessage('Pincode is reqd and must be valid'),
        body('password').isLength({ min: 5 }).withMessage('Password is reqd and must be greater than 5 chars'),
        body('role').isString().withMessage('Enter valid role')
    ];
};

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors: any[] = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors
    });
};

module.exports = {
    userSignupValidationRules,
    validate
};
