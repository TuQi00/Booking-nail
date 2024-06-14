const { FormData, Booking } = require('../dbconfigs/models');

const getFormData = async (req, res) => {
    try {
        const formData = await FormData.findOne();
        if (!formData) {
            return res.status(404).json({ message: 'Form data not found' });
        }
        res.json(formData);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).json({ message: 'Error fetching form data', error: error.message });
    }
};

const getAvailableTimes = async (req, res) => {
    try {
        const { service, date } = req.query;
        if (!service || !date) {
            return res.status(400).json({ message: 'Service and date are required query parameters' });
        }

        const formData = await FormData.findOne();
        if (!formData) {
            return res.status(404).json({ message: 'Form data not found' });
        }

        const availableTimes = formData.availableTimes;
        // Simulate filtering available times based on service and date (replace with actual logic)
        const filteredTimes = availableTimes.filter(time => time !== '13:00'); // Example filtering

        res.json(filteredTimes);
    } catch (error) {
        console.error('Error fetching available times:', error);
        res.status(500).json({ message: 'Error fetching available times', error: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};

module.exports = { getFormData, getAvailableTimes, getAllBookings };
