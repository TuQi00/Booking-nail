const mongoose = require('../dbconfigs/connectDB');
const Schema = mongoose.Schema;

const serviceSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subServices: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'SubService' 
    }] 
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
