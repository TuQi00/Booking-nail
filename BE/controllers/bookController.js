const { Booking } = require('../dbconfigs/models');

const handleBooking = async (req, res) => {
    const bookingData = req.body;
    console.log('bookingData: ', bookingData);
    try {
        const booking = new Booking({
            name: bookingData.name,
            email: bookingData.email,
            service: bookingData.service,
            date: bookingData.date,
            time: bookingData.time
        });
        const bookings = await Booking.find();
        res.json("Booking data: ",bookings);
        const savedBooking = await booking.save();
        res.json({ message: 'Booking received successfully', data: savedBooking });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ message: 'Error saving booking', error: error.message });
    }
};

module.exports = handleBooking;
