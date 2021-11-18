// const mongoose_obj = require('mongoose');
// const Schema = mongoose_obj.Schema;
import mongoose, { Schema } from 'mongoose';

import { IUser } from '../interfaces/user';

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: 'customer'
    },
    accountCreated: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        expires: '36'
    },

    bookings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ]
});

module.exports = mongoose.model<IUser>('User', userSchema);
