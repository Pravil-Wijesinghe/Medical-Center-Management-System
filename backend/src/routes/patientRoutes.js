const express = require('express');
const router = express.Router();
const { getPatientDetails, getPatientsList } = require('../controllers/patientController');

router.get('/:patientId', getPatientDetails);
router.post('/list', getPatientsList);

module.exports = router;
