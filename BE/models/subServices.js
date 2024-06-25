const mongoose = require('../dbconfigs/connectDB');
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
const SubService = mongoose.model('SubService', subserviceSchema);

<<<<<<< HEAD
module.exports = SubService;
=======
module.exports = mongoose.model('Subservice', subserviceSchema);
>>>>>>> origin/main
