const express = require('express');
const router = express.Router();
const { addDoctorController ,getDoctorDetails, getDoctorsList } = require('../controllers/doctorController');

router.post('/add', addDoctorController);
router.get('/:doctorId', getDoctorDetails);
router.post('/list', getDoctorsList);

module.exports = router;