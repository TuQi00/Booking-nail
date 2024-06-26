const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  services: [{
    name: { type: String, required: true },
    subServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubService' }]
  }],
  availableTimes: [String]
});

const FormData = mongoose.model('FormData', formDataSchema);
module.exports = FormData;
