const { FormData, Booking } = require('../dbconfigs/models');

const getFormData = async (req, res) => {
    try {
        const formData = await FormData.findOne();
        res.json(formData);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).json({ message: 'Error fetching form data', error: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

module.exports = { getFormData, getAllBookings };

