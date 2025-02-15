const express = require('express');
const router = express.Router();
const { addStaffMember, getStaffDetails, getStaffList, updateStaffMember, deleteStaffMember } = require('../controllers/staffController');

router.post('/add', addStaffMember);
router.get('/:staffId', getStaffDetails);
router.post('/list', getStaffList);
router.put('/update/:staffId', updateStaffMember);
router.delete('/delete/:staffId', deleteStaffMember);

module.exports = router;