const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subserviceSchema = new mongoose.Schema({
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
const subService = mongoose.model('Subservice', subserviceSchema);

module.exports = subService
