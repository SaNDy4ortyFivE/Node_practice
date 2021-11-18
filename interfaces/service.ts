import { Document, ObjectId } from 'mongoose';

export interface IService extends Document {
    name: String;
    category: String;
    priceLowLimit: Number;
    priceHighLimit: Number;
    description: String;
    imageUrl?: String;
    createdBy: ObjectId;
}
