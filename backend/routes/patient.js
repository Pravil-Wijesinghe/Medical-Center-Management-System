const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Update patient data
router.put('/update', (req, res) => {
    const { nic, firstName, lastName, mobileNumber, email, dob, gender, weight, height, bloodGroup, address } = req.body;

    console.log('Received update request:', req.body);

    const query = `
        UPDATE patient
        SET First_Name = ?, Last_Name = ?, Mobile_Number = ?, Email = ?, DOB = ?, Gender = ?, Weight = ?, Height = ?, Blood_Group = ?, Address = ?
        WHERE NIC = ?`;

    connection.query(query, [firstName, lastName, mobileNumber, email, dob, gender, weight, height, bloodGroup, address, nic], (err, results) => {
        if (err) {
            console.error('Error updating patient data:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ message: 'Patient data updated successfully' });
    });
});

// Upload profile picture
router.post('/upload', upload.single('profilePicture'), (req, res) => {
    const { nic } = req.body;
    const profilePicture = req.file.filename;

    console.log('Received file upload request:', req.file);

    const query = 'UPDATE patient SET Profile_Picture = ? WHERE NIC = ?';
    connection.query(query, [profilePicture, nic], (err, results) => {
        if (err) {
            console.error('Error updating profile picture:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ message: 'Profile picture updated successfully', profilePicture });
    });
});

module.exports = router;
