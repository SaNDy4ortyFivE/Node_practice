// Signup Validator

import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const bookingValidationRules = () => {
    return [body('userId').isString().withMessage('UserId is required & must be valid'), body('subServiceId').isString().withMessage('SubService is required & must be valid')];
};

module.exports = {
    bookingValidationRules
};
