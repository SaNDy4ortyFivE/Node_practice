import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/user';

// Models
const User = require('../models/user');

// Fetch Profile of admin and send profile data as response
exports.profile = async (req: Request, res: Response, next: NextFunction) => {
    console.log('inside profile', req.body);
    if (req.body.userId.match(/^[0-9a-fA-F]{24}$/)) {
        const user = await User.findById({ _id: req.body.userId }).select('-password');
        if (!user) {
            res.status(500).send('Unknown Error! Please try again later');
        } else {
            res.status(200).send({ msg: 'Ok', user: user });
        }
    } else {
        res.status(500).send('Invalid user! Please login again');
    }
};

// Allow user to edit there profile
exports.editProfile = async (req: Request, res: Response, next: NextFunction) => {
    const body: IUser = req.body as IUser;
    const { name, phone, email, address, pincode } = body;

    const updatedUser = await User.findOneAndUpdate({ _id: req.body.userId }, { name, phone, email, address, pincode }, { new: true }).catch((err: Error) => {
        console.log(err);
        res.status(500).send(err);
    });

    return res.status(200).send({ msg: 'Ok', user: updatedUser });
};

// Admin fetches all customer
exports.fetchCustomers = async (req: Request, res: Response, next: NextFunction) => {
    User.find({ role: 'customer' })
        .populate('bookings')
        .then((data: IUser) => {
            console.log('Fetched customers');
            res.status(200).send({ msg: 'ok', data: data });
        })
        .catch((err: Error) => {
            console.log('error while fetching customer ', err);
            res.status(500).send({ msg: 'Internal server error!', data: [] });
        });
};

// Admin fetches single customer

// Not needed
// Fetch all services
// each service contains all data
// Manage state on frontend to see one service

// Admin finds customer by phone
exports.findCustomerByPhone = (req: Request, res: Response, next: NextFunction) => {
    User.findOne({ phone: req.params.phone, role: 'customer' })
        .populate('bookings')
        .populate({ path: 'bookings', populate: { path: 'subServiceId' } })
        .then((data: IUser) => {
            console.log('fetched customer ');
            if (!data) {
                res.status(200).send({ msg: 'No customer with mobile number', data: [] });
            } else {
                res.status(200).send({ msg: 'Ok', data: data });
            }
        })
        .catch((err: Error) => {
            console.log('error while fetching customer', err);
            res.status(500).send({ msg: 'Internal server error', data: [] });
        });
};
