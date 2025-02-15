const express = require('express');
const router = express.Router();
const { getPatientDetails } = require('../controllers/patientController');

router.get('/:patientId', getPatientDetails);

module.exports = router;
