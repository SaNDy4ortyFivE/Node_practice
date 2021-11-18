// Signup Validator

import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const forgetPasswordValidationRules = () => {
    return [body('phone').isMobilePhone('any').withMessage('Phone is required & must be valid')];
};

module.exports = {
    forgetPasswordValidationRules
};
