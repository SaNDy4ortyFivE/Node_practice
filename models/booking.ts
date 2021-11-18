const mongoose_book = require('mongoose');
const Schema_book = mongoose_book.Schema;

const bookingSchema = new Schema_book(
    {
        userId: {
            type: Schema_book.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        subServiceId: {
            type: Schema_book.Types.ObjectId,
            required: true,
            ref: 'SubService'
        },
        isServed: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose_book.model('Booking', bookingSchema);
