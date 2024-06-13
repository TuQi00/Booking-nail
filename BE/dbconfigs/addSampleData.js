const mongoose = require('./database');
const { FormData } = require('./models');

// Dữ liệu mẫu cho FormData
const sampleData = {
    services: [
        {
            name: 'Manicure',
            description: 'A cosmetic treatment for the hands and nails.',
            price: 25,
            duration: 30
        },
        {
            name: 'Pedicure',
            description: 'A cosmetic treatment for the feet and toenails.',
            price: 30,
            duration: 45
        },
        {
            name: 'Full Set',
            description: 'Complete set of artificial nails.',
            price: 50,
            duration: 60
        },
        {
            name: 'Fill',
            description: 'Refill for artificial nails.',
            price: 35,
            duration: 45
        }
    ],
    availableTimes: [
        '09:00', '10:00', '11:00', '13:00', '14:00', '15:00'
    ]
};

// Kết nối tới MongoDB và thêm dữ liệu
mongoose.connection.once('open', async () => {
    try {
        // Xóa dữ liệu cũ (nếu có) để tránh trùng lặp
        await FormData.deleteMany({});
        
        // Thêm dữ liệu mẫu
        const formData = new FormData(sampleData);
        await formData.save();
        
        console.log('Sample data added successfully');
    } catch (error) {
        console.error('Error adding sample data:', error);
    } finally {
        mongoose.connection.close();
    }
});
