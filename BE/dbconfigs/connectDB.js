const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/booking')
  .then(() => {
    console.log('Connected to MongoDB');
    const seedData = require('./addSampleData'); // Import seedData after connection
    return seedData(); // Call seedData after the connection is established
  })
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
  });

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
