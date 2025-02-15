const express = require('express');
const router = express.Router();
const { getPatientDetails, getPatientsList, updatePatient } = require('../controllers/patientController');

router.get('/:patientId', getPatientDetails);
router.post('/list', getPatientsList);
router.put('/update/:patientId', updatePatient);

module.exports = router;
