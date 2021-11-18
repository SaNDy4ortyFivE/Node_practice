// const mongoose_subservice = require('mongoose');
// const Schema_subservice = mongoose_subservice.Schema;

import mongoose, { Schema } from 'mongoose';
import { ISubService } from '../interfaces/subservice';

const subserviceSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        priceLowLimit: {
            type: Number,
            required: true
        },
        priceHighLimit: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String
        },
        serviceId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Service'
        }
    },
    {
        timestamps: true
    }
);

// module.exports = mongoose.model<ISubService>('SubService', subserviceSchema);
module.exports = mongoose.model('SubService', subserviceSchema);
