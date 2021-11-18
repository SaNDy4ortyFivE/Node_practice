// dependencies
const express = require('express');
const path = require('path');

// test
const User = require('./models/user.ts');
const Booking = require('./models/booking.ts');
const Service = require('./models/service');
const SubService = require('./models/subservice.ts');
const ViewedService = require('./models/viewedservice.ts');

// test end
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const cors = require('./middlewares/cors');

const auth = require('./routes/auth');
const admin = require('./routes/admin');
const customer = require('./routes/customer');

// Middlewares
const adminAuth = require('./middlewares/adminAuth');
const customerAuth = require('./middlewares/customerAuth');

const PORT = process.env.PORT || 8000;

const app = express();

// Using BodyParser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Adding Cors Middleware
app.use(cors);

app.use('/auth', auth);
app.use('/admin', adminAuth, admin);
app.use('/customer', customerAuth, customer);
// app.use('/auth', (req: any, res: any) => {
//     console.log('inside auth');
// });

// app.use(async (req: any, res: any, next: any) => {
// console.log('hii');
// user created*************
// const user: any = await User.create({
//     name: 'Prabhat',
//     phone: 7057965399,
//     email: 'bill@microsoft.com',
//     address: 'Pune',
//     pincode: 411047,
//     password: 'prabhat',
//     role: 'admin'
// });
// console.log('created', user);

// service created**************
// const service: any = await Service.create({
//     name: 'AC Repair',
//     category: 'AC',
//     priceLowLimit: 1000,
//     priceHighLimit: 2000,
//     description: 'This is AC repair service'
// });
// console.log('service created ', service);

// subservice created*************
// const subservice: any = await SubService.create({
//     name: 'AC delux',
//     category: 'AC Platinum',
//     priceLowLimit: 1500,
//     priceHighLimit: 1900,
//     description: 'Ac Platinum provided at best price',
//     serviceId: '61929d5bb2ded9f707a820a3'
// });

// booking created
// const booking: any = await Booking.create({
//     userId: '61929a95f8907596b3a0c337',
//     subServiceId: '61929fb73d47a0a1f5ab55d7'
// });

// find one user add booking id and save
// const user = User.findOne({ _id: '61929a95f8907596b3a0c337' })
//     .then((item: any) => {
//         item.bookings.push('6192a18fc75f7e1853863510');
//         item.save((err: any) => console.log('error while saving', err));
//     })
//     .catch((err: any) => {
//         console.log('error while updating');
//     });

// find one user id and populate booking
// const user = User.findOne({ _id: '61929a95f8907596b3a0c337' })
//     .populate('bookings')
//     .then((p: any) => console.log(p))
//     .catch((err: any) => console.log('error while poppu', err));
// console.log(user);
// res.send('hi');
// });

mongoose
    .connect(process.env.MONGO_URI)
    .then((res: any) => {
        console.log('connected: ', typeof res);
        try {
            app.listen(PORT);
        } catch (err: any) {
            console.log('error while listning: ', err);
        }
    })
    .catch((err: Error) => {
        console.log('error while connection to db: ', err);
    });
