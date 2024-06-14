const express = require('express');
const {getFormData,getAvailableTimes, getAllBookings} = require('../controllers/formDataController');
const router = express.Router();

router.get('/form-data', getFormData);
router.get('/available-times', getAvailableTimes);
router.get('/all-bookings', getAllBookings);

module.exports = router;