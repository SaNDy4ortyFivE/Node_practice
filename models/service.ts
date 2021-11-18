import { Schema } from 'mongoose';

const mongoose_service = require('mongoose');
const Schema_service = mongoose_service.Schema;

const serviceSchema = new Schema_service({
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
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose_service.model('Service', serviceSchema);
