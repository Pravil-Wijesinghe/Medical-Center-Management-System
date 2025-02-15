const express = require('express');
const router = express.Router();
const { getProfilePicture } = require('../controllers/profileController');

router.get('/:fileName', getProfilePicture);

module.exports = router;