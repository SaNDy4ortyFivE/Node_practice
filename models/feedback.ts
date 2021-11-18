import mongoose, { Schema } from 'mongoose';

const feedBackSchema: Schema = new Schema({
    bookingId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Booking',
        unique: true
    },
    feedBackText: {
        type: String
    },
    response: [
        {
            type: String
        }
    ]
});

module.exports = mongoose.model('FeedBack', feedBackSchema);
