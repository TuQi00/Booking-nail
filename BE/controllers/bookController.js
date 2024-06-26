const Booking = require('../models/booking'); // Import đúng cách mô hình Booking

const handleBooking = async (req, res) => {
    const bookingData = req.body;
    console.log('bookingData: ', bookingData);
    try {
        const { name, email, service, subservice, date, time } = req.body;

        // Basic validation
        if (!name || !email || !service || !subservice || !date || !time) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new booking
        const newBooking = new Booking({ name, email, service, subservice, date, time });
        await newBooking.save();

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

module.exports = handleBooking;
