const express = require('express');
const router = express.Router();
const { addStaffMember, getStaffDetails } = require('../controllers/staffController');

router.post('/add', addStaffMember);
router.get('/:staffId', getStaffDetails);

module.exports = router;