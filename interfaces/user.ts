import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
    name: String;
    phone: Number;
    email?: String;
    address: String;
    pincode: Number;
    password: String;
    role: String;
    isVerified: Boolean;
    otp?: String;
    bookings?: [{ _id: ObjectId }];
}
