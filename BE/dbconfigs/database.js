const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/booking", {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB', err);
});

const customerSchema = new mongoose.Schema({
    _id: String,
    name: String,
    phone: String,
    email: String,
    loyaltyPoints: Number
});

const serviceSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    price: Number,
    duration: Number
});

const employeeSchema = new mongoose.Schema({
    _id: String,
    name: String,
    position: String,
    phone: String,
    email: String
});

const bookingSchema = new mongoose.Schema({
    _id: String,
    customerId: String,
    serviceId: String,
    employeeId: String,
    date: Date,
    status: String
});

const Customer = mongoose.model('Customer', customerSchema);
const Service = mongoose.model('Service', serviceSchema);
const Employee = mongoose.model('Employee', employeeSchema);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = {
    Customer,
    Service,
    Employee,
    Booking
};
