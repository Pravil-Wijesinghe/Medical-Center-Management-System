const express = require('express');
const router = express.Router();
const { addDoctorController ,getDoctorDetails, getDoctorsList, updateDoctor, deleteDoctor, addAvailableTime, getDoctorCount } = require('../controllers/doctorController');

router.post('/add', addDoctorController);
router.get('/details/:doctorId', getDoctorDetails);
router.post('/list', getDoctorsList);
router.put('/update/:doctorId', updateDoctor);
router.delete('/delete/:doctorId', deleteDoctor);
router.post('/addAvailableTime', addAvailableTime);
router.get("/count", getDoctorCount);

module.exports = router;