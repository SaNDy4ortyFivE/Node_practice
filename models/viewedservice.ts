const mongoose_viewedSchema = require('mongoose');
const Schema_viewed = mongoose_viewedSchema.Schema;

const viewedSchema = new Schema_viewed(
    {
        serviceId: {
            type: Schema_viewed.Types.ObjectId,
            required: true,
            ref: 'Service'
        },
        userId: {
            type: Schema_viewed.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose_viewedSchema.model('ViewedService', viewedSchema);
