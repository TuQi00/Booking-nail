const express = require('express');
const {getFormData, getAllBookings} = require('../controllers/formDataController');
const router = express.Router();

router.get('/form-data', getFormData);
router.get('/all-bookings', getAllBookings);

module.exports = router;