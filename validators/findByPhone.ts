// Signup Validator

import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';

const findPhoneValidationRules = () => {
    return [param('phone').isMobilePhone('any').withMessage('Phone is required & must be valid')];
};

module.exports = {
    findPhoneValidationRules
};
