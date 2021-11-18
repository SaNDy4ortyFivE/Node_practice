import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/user';

// Models
const User = require('../models/user');

// Fetch Profile of admin and send profile data as response
exports.profile = async (req: Request, res: Response, next: NextFunction) => {
    // user id must be in token
    // try not to pass explicitly
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
    // user id must be in token
    // try not to pass explicitly
    const body: IUser = req.body as IUser;
    const { name, phone, email, address, pincode } = body;

    const updatedUser = await User.findOneAndUpdate({ _id: req.body.userId }, { name, phone, email, address, pincode }, { new: true }).catch((err: Error) => {
        console.log(err);
        res.status(500).send(err);
    });

    return res.status(200).send({ msg: 'Ok', user: updatedUser });
};
