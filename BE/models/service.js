const mongoose = require('../dbconfigs/connectDB');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
const Service = mongoose.model('Service', serviceSchema);
module.exports = Service
