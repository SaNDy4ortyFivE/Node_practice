const bcrypt = require('bcrypt');

import e, { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/user';
import {generateAccessToken, generateRefreshToken} from "./utils/authHelper";
const { generateOTP, fast2sms } = require('../utils/otp');

const jwt = require('jsonwebtoken');

// Models
const User = require('../models/user');

exports.signup = async (req: Request, res: Response, next: NextFunction) => {
    const body: IUser = req.body as IUser;
    console.log(body);
    const { name, email, phone, address, pincode, role, password } = body;

    let user = await User.findOne({ phone: phone }).select('-password');
    if (user) {
        return res.status(400).send('User already exisits!');
    } else {
        user = new User({
            name: name,
            phone: phone,
            email: email,
            address: address,
            pincode: pincode,
            role: role,
            password: password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    }

    console.log(user);
};

exports.signin = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    let isAuthorized:boolean = req.body["isAuthorized"];
    if(!isAuthorized){
            const { phone, password } = req.body;
            let user = await User.findOne({ phone: phone }).select('+password');
            if (!user) {
                return res.status(401).send('Incorrect email or password.');
            } else {
                console.log('user ', user);
                const validPassword = await bcrypt.compare(password, user.password);
                if (!validPassword) {
                    return res.status(401).send('Incorrect email or password.');
                }

                let findal_user = await User.findOne({ phone: phone }).select('-password');
                if (findal_user) {
                    const payload = {
                        user: {
                            id: findal_user._id
                        }
                    };
                    console.log('see success', findal_user);

                    const accessToken = await jwt.sign(payload, process.env.ACCESS_SECRET, {
                        expiresIn: 17208
                    });

                    const refreshToken = await jwt.sign(payload, process.env.REFRESH_SECRET, {
                        expiresIn: 17208
                    });

                    res.status(200).send({ msg: 'ok', data: [{ user: findal_user, accessToken: accessToken, refreshToken: refreshToken }] });
                } else {
                    res.status(500).send({ msg: 'Internal server error', data: [] });
                }
            }
    }else{
            res.status(200).send({msg:'ok'});
    }
    // res.status(200).send({ msg: 'Successfully Logged in', user: findal_user });
};

// User signup
// Success signup -> Verify OTP
// If not verfied
// Before login ask to verify OTP

// Send otp
exports.sendOTP = async (req: Request, res: Response, next: NextFunction) => {
    // const userId = req.body.userId;
    const phone = req.body.phone;
    const otp = generateOTP(6);
    console.log('otp', otp);
    User.findOneAndUpdate({ phone: phone }, { otp: otp }, { new: true })
        .then(async (data: IUser) => {
            await fast2sms(
                {
                    message: `Your OTP is ${otp}`,
                    contactNumber: phone
                },
                res.status(200).send({ msg: 'message sent on your phone', data: [] })
            );
        })
        .catch((err: any) => {
            console.log('err', err);
            res.status(500).send({ msg: 'Internal server error', data: [] });
        });
};

exports.verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
    // const userId = req.body.userId;
    const { phone, otp } = req.body;

    User.findOne({ phone: phone })
        .then(async (data: IUser) => {
            if (!data) {
                res.status(400).send({ msg: 'User not registered, register first!', data: [] });
            } else {
                if (otp === data.otp) {
                    data.isVerified = true;
                    data.save()
                        .then((data: any) => {
                            res.status(200).send({ msg: 'User verified, Now login', data: [] });
                        })
                        .catch((err: Error) => {
                            console.log('error');
                            res.status(500).send({ msg: 'Internal server error', data: [] });
                        });
                }
            }
        })
        .catch((err: Error) => {
            console.log('er', err);
            res.status(500).send({ msg: 'Internal server error', data: [] });
        });
};
