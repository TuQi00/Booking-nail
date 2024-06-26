const express = require('express');
const { getFormData, getAvailableTimes, getAllBookings, getSubServices,getServices } = require('../controllers/formDataController');
const handleBooking = require('../controllers/bookController');

const router = express.Router();

router.get('/form-data', getFormData);
router.get('/available-times', getAvailableTimes);
router.get('/services', getServices);
router.get('/services/:_id', getServices);
router.get('/services/:serviceId/subservices', getSubServices);
router.get('/all-bookings', getAllBookings);

router.post('/booking', handleBooking);

module.exports = router;
