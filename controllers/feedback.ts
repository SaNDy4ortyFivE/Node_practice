import { NextFunction, Request, Response } from 'express';

const FeedBack = require('../models/feedback');

// Fetch Feedback using booking ID
exports.feedBackUsingBookingId = (req: Request, res: Response) => {
    // Later check booking id with user id

    const bookingId = req.body.bookingId;

    FeedBack.find({ bookingId: bookingId })
        .populate({ path: 'bookingId', populate: { path: 'subServiceId' } })
        .then((data: any) => {
            console.log('Feeddback fetched');
            res.status(200).send({ msg: 'ok', data: data });
        })
        .catch((err: Error) => {
            console.log('Error while fetching...', err);
            res.status(500).send({ msg: 'Internal server errro', data: [] });
        });
};

exports.postFeedback = async (req: Request, res: Response) => {
    const { bookingId, feedBackText, response } = req.body;

    const feedback = await FeedBack.findOne({ bookingId: bookingId });

    if (feedback) {
        res.status(400).send({ msg: 'Feedback Already given', data: [] });
    } else {
        FeedBack.create({
            bookingId: bookingId,
            feedBackText: feedBackText,
            response: response
        })
            .then((data: any) => {
                console.log('feedback saved');
                res.status(200).send({ msg: 'ok', data: data });
            })
            .catch((err: Error) => {
                console.log('internal server error');
                res.status(200).send({ msg: 'internal server error', data: [] });
            });
    }
};

// Fetch All FeedBack for Admin
// Not needed now
