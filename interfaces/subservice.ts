import { Document, ObjectId } from 'mongoose';
import { IService } from './service';

export interface ISubService extends Document, IService {
    serviceId: { _id: ObjectId };
}
