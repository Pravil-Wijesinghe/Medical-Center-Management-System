const express = require('express');
const router = express.Router();
const { addStaffMember, getStaffDetails, getStaffList, updateStaffMember } = require('../controllers/staffController');

router.post('/add', addStaffMember);
router.get('/:staffId', getStaffDetails);
router.post('/list', getStaffList);
router.put('/update/:staffId', updateStaffMember);

module.exports = router;