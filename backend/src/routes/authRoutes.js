const express = require('express');
const router = express.Router();
const { loginUser, registerPatient } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/signup/patient', registerPatient);

module.exports = router;