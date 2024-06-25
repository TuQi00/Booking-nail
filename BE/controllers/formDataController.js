const mongoose = require('mongoose');
const { FormData, Service, Booking, SubService } = require('../models/_models')

// const getFormData = async (req, res) => {
//     try {
//         const formData = await FormData.findOne();
//         if (!formData) {
//             return res.status(404).json({ message: 'Form data not found' });
//         }

//         const services = await Service.find().populate('subServices').lean();
//         formData.services = services;

//         res.json(formData);
//     } catch (error) {
//         console.error('Error fetching form data:', error);
//         res.status(500).json({ message: 'Error fetching form data', error: error.message });
//     }
// };

const getFormData = async (req, res) => {
    try {
        const data = await Service.find().populate('subServices');
        console.log(data,"BE 24 form data control" );
        res.json(data);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).send('Internal Server Error');
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
const getSubServices = async (req, res) => {
    const { serviceId } = req.params;
    console.log(serviceId, 'serviceId BE 56');
    try {
        const subservices = await SubService.find({ service: serviceId });
        console.log(subservices);
        res.json(subservices);
    } catch (err) {
         
        console.error('Error fetching subservices:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getServices = async (req, res) => {
    try {
        const services = await Service.find().populate('subServices').lean();
        res.json({ services });
    } catch (err) {
        console.error('Error fetching services:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

<<<<<<< HEAD

=======
<<<<<<< HEAD
>>>>>>> origin/main
module.exports = { getFormData, getAvailableTimes, getAllBookings, getSubServices, getServices };
=======
module.exports = { getFormData, getAvailableTimes, getAllBookings, getSubServices, getServices };
>>>>>>> 4d58c120a0aceb7f6ff096f9ff1c9e3d166716c3
