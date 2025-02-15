const express = require('express');
const router = express.Router();
const { getPatientDetails, getPatientsList, updatePatient, deletePatient } = require('../controllers/patientController');

router.get('/:patientId', getPatientDetails);
router.post('/list', getPatientsList);
router.put('/update/:patientId', updatePatient);
router.delete('/delete/:patientId', deletePatient);

module.exports = router;
