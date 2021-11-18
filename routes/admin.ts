import express, { Request, Response, NextFunction } from 'express';

const User = require('../models/user');

// controller
const adminController = require('../controllers/admin');
const serviceController = require('../controllers/service');
const bookingController = require('../controllers/booking');
const feedbackController = require('../controllers/feedback');

// validators
const { userSignupValidationRules, validate } = require('../validators/signup');
const { createServiceValidationRules } = require('../validators/create-service');
const { findPhoneValidationRules } = require('../validators/findByPhone');
const { userProfileValidationRules } = require('../validators/editProfile');

// Middleware
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log('Admin Testing Route');
});

// done
router.get('/profile', auth, adminController.profile);

// done
router.patch('/profile', userProfileValidationRules(), validate, auth, adminController.editProfile);

// done
router.post('/service', createServiceValidationRules(), validate, auth, serviceController.createServiceAdmin);

// done
router.get('/services', auth, serviceController.fetchServiceAdmin);

// done
router.get('/service/:serviceId', auth, serviceController.findSubserviceById);

// done
router.patch('/service', auth, serviceController.editServiceAdmin);

// done
router.put('/subservice/:serviceId', createServiceValidationRules(), validate, auth, serviceController.createSubservice);

// pending
// edit subservice
router.patch('/subservice/', createServiceValidationRules(), validate, auth, serviceController.editSubservice);

// done
router.get('/booking', auth, bookingController.fetchBookings);

// done
router.patch('/booking', auth, bookingController.toggleBookingStatus);

// done
router.get('/customers', auth, adminController.fetchCustomers);

router.get('/customers/:id', (req: Request, res: Response, next: NextFunction) => {
    // Not needed
    // Fetch all customers
    // each customer contains all data
    // Manage state on frontend to see one customer
    console.log('Fetch Details of customer');
});

// done
router.get('/findByPhone/:phone', findPhoneValidationRules(), validate, auth, adminController.findCustomerByPhone);

// fetch feedbacl using booking id
router.get('/feedback', auth, feedbackController.feedBackUsingBookingId);

module.exports = router;
