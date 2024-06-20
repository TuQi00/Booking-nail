const mongoose = require('./connectDB');
const seedData = require('./addSampleData');

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  seedData(); // Seed initial data after successful connection
});
