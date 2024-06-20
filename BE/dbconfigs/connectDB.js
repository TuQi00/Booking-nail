const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/booking').then(() => {
  console.log('Connected to MongoDB 1');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
