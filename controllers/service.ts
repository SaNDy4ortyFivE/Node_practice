import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { IService } from '../interfaces/service';
import { ISubService } from '../interfaces/subservice';

// Models
const Service = require('../models/service');
const SubService = require('../models/subservice');

exports.fetchServiceAdmin = async (req: Request, res: Response, next: NextFunction) => {
    Service.find()
        .populate('createdBy')
        .then((data: IService) => {
            res.status(200).send({ msg: 'Ok', data: data });
        })
        .catch((err: Error) => {
            console.log('Error while fetching services', err);
            res.status(500).send({ msg: 'Internal server erro', data: [] });
        });
};

exports.fetchServiceCustomer = async (req: Request, res: Response, next: NextFunction) => {
    Service.find()
        .then((data: IService) => {
            res.status(200).send({ msg: 'Ok', data: data });
        })
        .catch((err: Error) => {
            console.log('Error while fetching services', err);
            res.status(500).send({ msg: 'Internal server erro', data: [] });
        });
};

exports.fetchSingleServiceAdmin = async (req: Request, res: Response) => {
    // Not needed
};

exports.createServiceAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const body: IService = req.body as IService;
    const { name, category, priceLowLimit, priceHighLimit, description, imageUrl, createdBy } = body;

    let service = new Service({
        name: name,
        category: category,
        priceHighLimit: priceHighLimit,
        priceLowLimit: priceLowLimit,
        description: description,
        imageUrl: imageUrl,
        createdBy: req.body._id
    });

    service
        .save()
        .then((data: IService) => {
            console.log(data);
            res.status(200).send({
                msg: 'Ok',
                data: data
            });
        })
        .catch((err: Error) => {
            console.log('error while creating service ', err);
            res.status(500).send({ msg: 'Internal Server error', data: [] });
        });
};

// Allow admin to edit there service
exports.editServiceAdmin = async (req: Request, res: Response, next: NextFunction) => {
    // ******important********
    // Later-- Extract user info using token
    // add into req when using auth middleware
    const admin_id = req.body.userId;

    const { name, _id, category, priceHighLimit, priceLowLimit, description, imageUrl, createdBy } = req.body;

    if (admin_id === createdBy) {
        Service.findOneAndUpdate({ _id: _id }, { name, category, priceHighLimit, priceLowLimit, description, imageUrl }, { new: true })
            .then((data: IService) => {
                console.log('updated: ', data);
                res.status(200).send({ msg: 'ok', data: data });
            })
            .catch((error: Error) => {
                console.log('error while updating ');
            });
    } else {
        res.status(402).send({ msg: 'Authorization error', data: [] });
    }
};

exports.findSubserviceById = (req: Request, res: Response, next: NextFunction) => {
    console.log('inside');
    const serviceId = req.params.serviceId;
    console.log(serviceId);
    SubService.find({ serviceId: serviceId })
        .then((data: ISubService) => {
            console.log('inside subservice ', data);
            if (data) {
                res.status(200).send({ msg: 'ok', data: data });
            } else {
                console.log('no subservice for given service');
                res.status(200).send({ msg: 'No subservice for given service', data: [] });
            }
        })
        .catch((err: Error) => {
            console.log('Error subservice fetch ', err);
            res.status(500).send({ msg: 'Internal server error', data: [] });
        });
};

// Allow admin to edit there subservice
exports.editSubservice = async (req: Request, res: Response, next: NextFunction) => {
    // ******important********
    // Later-- Extract user info using token
    // add into req when using auth middleware

    const { name, _id, category, priceHighLimit, priceLowLimit, description, imageUrl } = req.body;

    SubService.findOneAndUpdate({ _id: _id }, { name, category, priceHighLimit, priceLowLimit, description, imageUrl }, { new: true })
        .then((data: any) => {
            console.log('updated: ', data);
            res.status(200).send({ msg: 'ok', data: data });
        })
        .catch((error: Error) => {
            console.log('error while updating ');
            res.status(500).send({ msg: 'internal server error', data: [] });
        });
    // res.status(402).send({ msg: 'Authorization error', data: [] });
};

exports.createSubservice = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Inside create sub service');
    // checks for admin user
    // later extract user id of current user from token
    const admin_id = req.body.userId;

    // category - same as service category
    // as of now manually from frontend
    // later automatic updation will be implemented
    const { name, category, priceLowLimit, priceHighLimit, description, imageUrl } = req.body;

    const serviceId = req.params.serviceId;

    Service.findOne({ _id: serviceId })
        .then((data: IService) => {
            console.log('service is valid');
            // const createdBy = data.createdBy;
            console.log('datas service ', data);
            if (admin_id === data.createdBy.toString()) {
                console.log('inside equals');
                let subservice = new SubService({
                    name: name,
                    category: category,
                    priceHighLimit: priceHighLimit,
                    priceLowLimit: priceLowLimit,
                    description: description,
                    imageUrl: imageUrl,
                    serviceId: serviceId
                });

                subservice
                    .save()
                    .then((data: ISubService) => {
                        console.log('Added');
                        res.status(201).send({ msg: 'ok', data: data });
                    })
                    .catch((err: Error) => {
                        console.log('Error while adding subservice ', err);
                        res.status(500).send({ msg: 'internal server error', data: [] });
                    });
            } else {
                console.log('not equal');
                res.status(401).send({ msg: 'You are not allowed to add services to others', data: [] });
            }
        })
        .catch((err: Error) => {
            console.log('error while finding service', err);
            res.status(400).send({ msg: 'invalid service', data: [] });
        });
};
