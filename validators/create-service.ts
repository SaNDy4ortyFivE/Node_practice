// Signup Validator

import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const createServiceValidationRules = () => {
    return [
        body('name').isString().isLength({ max: 30 }).withMessage('Service name is required & length must be smaller than 30'),
        body('name').isString().isLength({ max: 30 }).withMessage('Service category is required & length must be smaller than 30'),
        body('priceLowLimit').isNumeric().withMessage('Price low limit is reqd and must be valid'),
        body('priceHighLimit').isNumeric().withMessage('Price high limit is reqd and must be valid'),
        body('description').isString().isLength({ max: 200 }).withMessage('Service category is required & length must be smaller than 200'),
        body('imageUrl').optional().isURL().withMessage('Enter valid image url')
    ];
};

module.exports = {
    createServiceValidationRules
};
