const express = require('express');
const router = express.Router();
const { getPatientDetails, getPatientsList, updatePatient, deletePatient, getPatientCount } = require('../controllers/patientController');

router.get('/details/:patientId', getPatientDetails);
router.post('/list', getPatientsList);
router.put('/update/:patientId', updatePatient);
router.delete('/delete/:patientId', deletePatient);
router.get("/count", getPatientCount);

module.exports = router;
