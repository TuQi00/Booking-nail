const { FormData } = require('../dbconfigs/models');

const getFormData = async (req, res) => {
    try {
        const formData = await FormData.findOne();
        res.json(formData);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).json({ message: 'Error fetching form data', error: error.message });
    }
};

module.exports = getFormData;

// db.formdatas.insertOne({
//     services: [
//         { name: 'Manicure', description: 'Basic manicure', price: 20, duration: 30 },
//         { name: 'Pedicure', description: 'Basic pedicure', price: 25, duration: 40 },
//         { name: 'Full Set', description: 'Full set of nails', price: 50, duration: 60 },
//         { name: 'Fill', description: 'Nail fill', price: 30, duration: 45 }
//     ],
//     availableTimes: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00']
// });
