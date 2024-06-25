const express = require('express');
const { getFormData, getAvailableTimes, getAllBookings, getSubServices,getServices } = require('../controllers/formDataController');
const router = express.Router();

router.get('/form-data', getFormData);
router.get('/available-times', getAvailableTimes);
router.get('/services', getServices);
router.get('/services/', getServices);
router.get('/services/:serviceId/subservices', getSubServices);
router.get('/all-bookings', getAllBookings);

module.exports = router;
