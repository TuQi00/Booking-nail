const express = require('express');
const handleBooking = require('../controllers/bookController');
const router = express.Router();

router.post('/booking', handleBooking);

module.exports = router;
