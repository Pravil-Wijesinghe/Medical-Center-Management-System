const express = require('express');
const router = express.Router();
const { uploadProfilePicture } = require('../controllers/uploadController');
const upload = require('../middleware/upload');

router.post('/profile-picture', upload.single('profilePicture'), uploadProfilePicture);

module.exports = router;