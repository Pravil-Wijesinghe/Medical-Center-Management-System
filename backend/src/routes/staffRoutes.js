const express = require('express');
const router = express.Router();
const { addStaffMember, getStaffDetails, getStaffList, updateStaffMember, deleteStaffMember, getStaffCount, getStaffCountByRole } = require('../controllers/staffController');

router.post('/add', addStaffMember);
router.get('/details/:staffId', getStaffDetails);
router.post('/list', getStaffList);
router.put('/update/:staffId', updateStaffMember);
router.delete('/delete/:staffId', deleteStaffMember);
router.get("/count", getStaffCount);
router.get("/count-by-role", getStaffCountByRole);

module.exports = router;