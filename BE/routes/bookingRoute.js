const express = require('express');
const handleBooking = require('../controllers/bookController');
const router = express.Router();

router.post('/book-service', handleBooking);
router.get('/form-data', (req, res) => {
    const formData = {
        services: ['Manicure', 'Pedicure', 'Full Set', 'Fill'],
        availableTimes: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00']
    };
    res.json(formData)});

module.exports = router;
