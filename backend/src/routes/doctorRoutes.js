const express = require('express');
const router = express.Router();
const { addDoctorController ,getDoctorDetails } = require('../controllers/doctorController');

router.post('/add', addDoctorController);
router.get('/:doctorId', getDoctorDetails);

module.exports = router;