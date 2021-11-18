import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/user';

// Models
const SubService = require('../models/subservice');
const User = require('../models/user');
const Booking = require('../models/booking');

// User book subservice
exports.bookService = (req: Request, res: Response, next: NextFunction) => {
    // userId is decoded and added automaically
    const { subServiceId, userId } = req.body;
    // booking created
    Booking.create({
        userId: userId,
        subServiceId: subServiceId
    })
        .then((data: any) => {
            console.log('Booking created');
            // find one user add booking id and save
            const user = User.findOne({ _id: userId })
                .then((item: any) => {
                    item.bookings.push(data._id);
                    item.save()
                        .then((data: any) => {
                            console.log('saved to user!');
                            res.status(200).send({ msg: 'Your booking is confirmed', data: [] });
                        })
                        .catch((err: any) => console.log('error while saving', err));
                })
                .catch((err: any) => {
                    console.log('error while updating');
                });
        })
        .catch((err: Error) => {
            console.log('Err ', err);
            res.status(500).send({ msg: 'Internal server error', data: [] });
        });
};

exports.fetchBookings = (req: Request, res: Response, next: NextFunction) => {
    Booking.find()
        .populate({ path: 'subServiceId' })
        .populate({ path: 'userId' })
        .then((data: any) => {
            console.log('bookings: ', data);
            res.status(200).send({ msg: 'ok', data: data });
        })
        .catch((err: Error) => {
            console.log('err ', err);
            res.status(500).send({ msg: 'Internal server error', data: [] });
        });
};

// Fetch single booking not needed
// All details in Fetch All bookings

exports.toggleBookingStatus = (req: Request, res: Response, next: NextFunction) => {
    const bookingId = req.body.bookingId;

    Booking.findOne({ _id: bookingId })
        .then((item: any) => {
            item.isServed = !item.isServed;
            item.save()
                .then((data: any) => {
                    console.log('updated');
                    res.status(200).send({ msg: 'ok', data: data });
                })
                .catch((err: Error) => {
                    res.status(500).send({ msg: 'Internal server error', data: [] });
                });
        })
        .catch((err: Error) => {
            console.log('could not find booking');
            res.status(400).send({ msg: 'Cannot find booking', data: [] });
        });
};

// Allow customer to fetch their booking history
exports.fetchCustomerBooking = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;
    Booking.find({ userId: userId })
        .populate({ path: 'subServiceId' })
        .then((data: any) => {
            console.log('fetched customer bookinh');
            res.status(200).send({ msg: 'ok', data: data });
        })
        .catch((err: Error) => {
            console.log('error while fetching data');
            res.status(500).send({ msg: 'Unknown Error', data: [] });
        });
};
