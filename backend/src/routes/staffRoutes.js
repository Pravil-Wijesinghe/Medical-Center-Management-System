const express = require('express');
const router = express.Router();
const { addStaffMember } = require('../controllers/staffController');

router.post('/add', addStaffMember);

module.exports = router;