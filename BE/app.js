const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Booking = require('./dbconfigs/database');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/form-data', (req, res) => {
    const formData = {
        services: ['Manicure', 'Pedicure', 'Full Set', 'Fill'],
        availableTimes: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00']
    };
    res.json(formData);
});

app.post('/book-service', async (req, res) => {
    const bookingData = req.body;
    console.log('bookingData: ', bookingData);
    try {
        const booking = new Booking({
            _id: bookingData._id,
            customerId: bookingData.customerId,
            serviceId: bookingData.serviceId,
            employeeId: bookingData.employeeId,
            date: bookingData.date,
            status: bookingData.status
        });

        const savedBooking = await booking.save();

        res.json({ message: 'Booking received successfully', data: savedBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error saving booking', error: error.message });
    }

});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
