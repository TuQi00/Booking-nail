const mongoose = require('./database');

const customerSchema = new mongoose.Schema({
    _id: String,
    name: String,
    phone: String,
    email: String,
    loyaltyPoints: Number
});

const serviceSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    duration: Number
});

const FormDataSchema = new mongoose.Schema({
    services: [serviceSchema],
    availableTimes: [String]
});

const employeeSchema = new mongoose.Schema({
    _id: String,
    name: String,
    position: String,
    phone: String,
    email: String
});

const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    service: String,
    date: Date,
    time: String
});

const Customer = mongoose.model('Customer', customerSchema);
const Service = mongoose.model('Service', serviceSchema);
const Employee = mongoose.model('Employee', employeeSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const FormData = mongoose.model('FormData', FormDataSchema);

module.exports = {
    Customer,
    Service,
    Employee,
    Booking,
    FormData
};
