const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({ 
    _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
