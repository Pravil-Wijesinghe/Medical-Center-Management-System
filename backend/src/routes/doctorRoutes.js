const express = require('express');
const router = express.Router();
const { addDoctorController ,getDoctorDetails, getDoctorsList, updateDoctor, deleteDoctor, addAvailableTime } = require('../controllers/doctorController');

router.post('/add', addDoctorController);
router.get('/:doctorId', getDoctorDetails);
router.post('/list', getDoctorsList);
router.put('/update/:doctorId', updateDoctor);
router.delete('/delete/:doctorId', deleteDoctor);
router.post('/addAvailableTime', addAvailableTime);

module.exports = router;