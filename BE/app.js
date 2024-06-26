const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./dbconfigs/connectDB');
const bookingRoutes = require('./routes/bookingRoutes');
const seedData = require('./dbconfigs/addSampleData');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookingRoutes);

connectDB().then(() => {
  // seedData();
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
