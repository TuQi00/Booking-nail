const mongoose = require('../dbconfigs/connectDB');

const customerSchema = new mongoose.Schema({
    _id: String,
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    loyaltyPoints: { type: Number, default: 0 }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
