const mongoose = require('../dbconfigs/connectDB');
const Schema = mongoose.Schema;

const subserviceSchema = new Schema({
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

module.exports = mongoose.model('Subservice', subserviceSchema);
