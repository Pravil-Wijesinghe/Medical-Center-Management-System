const express = require('express');
const router = express.Router();
const { addDoctorController } = require('../controllers/doctorController');

router.post('/add', addDoctorController);

module.exports = router;