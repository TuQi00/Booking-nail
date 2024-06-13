const express = require('express');
const handleBooking = require('../controllers/bookController');
const router = express.Router();

router.post('/book-service', handleBooking);

module.exports = router;
