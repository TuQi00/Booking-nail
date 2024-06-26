const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./dbconfigs/connectDB');
const formDataRoutes = require('./routes/formDataRoutes');
const bookingRoutes = require('./routes/bookingRoute');
const seedData = require('./dbconfigs/addSampleData');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', formDataRoutes);
app.use('/', bookingRoutes);

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    // await seedData();  // Seed the database only after a successful connection
    //"Client must be connected before running operations"
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

startServer().catch((err) => console.error('Error starting server:', err));
