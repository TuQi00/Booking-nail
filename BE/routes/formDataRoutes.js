const express = require('express');
const getFormData = require('../controllers/formDataController');
const router = express.Router();

router.get('/form-data', getFormData);

module.exports = router;
