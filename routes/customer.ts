import express, { Request, Response, NextFunction } from 'express';

// const { body } = require('express-validator/check');
const { userSignupValidationRules, validate } = require('../validators/signup');
const { bookingValidationRules } = require('../validators/createBooking');
const { userProfileValidationRules } = require('../validators/editProfile');
// Controller
const customerController = require('../controllers/customer');
const serviceController = require('../controllers/service');
const bookingController = require('../controllers/booking');
const feedbackController = require('../controllers/feedback');

// Middleware
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log('Customer Testing Route');
});

// done
router.patch('/profile', userProfileValidationRules(), validate, auth, customerController.editProfile);

// done
router.get('/service', auth, serviceController.fetchServiceCustomer);

// done
router.post('/book', bookingValidationRules(), validate, auth, bookingController.bookService);

// done
router.get('/bookings', auth, bookingController.fetchCustomerBooking);

// Feedback -- To be implemented
router.put('/feedback', auth, feedbackController.postFeedback);

// fetch feedbacl using booking id
router.get('/feedback', auth, feedbackController.feedBackUsingBookingId);

module.exports = router;
