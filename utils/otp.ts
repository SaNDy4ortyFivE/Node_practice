import { NextFunction } from 'express';

const fast2sms = require('fast-two-sms');

exports.generateOTP = (otp_length: any) => {
    // Declare a digits variable
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < otp_length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};

exports.fast2sms = async ({ message, contactNumber }: any, next: NextFunction) => {
    try {
        const res = await fast2sms.sendMessage({
            authorization: 'DljxGSBo9XzOYKgMEdv4213NnArqPJuTVbHtiyacZ86w0efQI7KMVPtCnXhF0mcbR1fLiQIUYygq5rH3',
            message,
            numbers: [contactNumber]
        });
        console.log(res);
    } catch (error) {
        next(error);
    }
};
