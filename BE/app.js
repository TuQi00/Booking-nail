const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const formDataRoutes = require('./routes/formDataRoutes');
const bookingRoutes = require('./routes/bookingRoute');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', formDataRoutes);
app.use('/', bookingRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
