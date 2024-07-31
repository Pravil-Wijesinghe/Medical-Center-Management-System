// backend/routes/patient.js
const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const validatePatientData = require('../Validations/validatePatient');



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

// Route to add a new patient
router.post('/add', async (req, res) => {
    const validation = validatePatientData(req.body);
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }

    const {
        NIC,
        First_Name,
        Last_Name,
        DOB,
        Gender,
        Password,
        Address = '',
        Weight = '',
        Height = '',
        Mobile_Number = '',
        Email = '',
        Blood_Group = '',
    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(Password, 10);

        const query = `
            INSERT INTO patient (NIC, First_Name, Last_Name, DOB, Gender, Password, Address, Weight, Height, Mobile_Number, Email, Blood_Group)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(
            query,
            [
                NIC,
                First_Name,
                Last_Name,
                DOB,
                Gender,
                hashedPassword,
                Address,
                Weight,
                Height,
                Mobile_Number,
                Email,
                Blood_Group,
            ],
            (err, results) => {
                if (err) {
                    console.error('Error adding patient:', err);
                    return res.status(500).json({ message: 'Database error', error: err });
                }
                res.status(200).json({ message: 'Patient added successfully' });
            }
        );
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to fetch all patients
router.get('/all', (req, res) => {
    const query = 'SELECT * FROM patient';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching patients:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
    });
});

// Route to search patients by NIC or name
router.get('/search', (req, res) => {
    const { term } = req.query;
    const query = `
        SELECT * FROM patient
        WHERE NIC LIKE ? OR CONCAT(First_Name, ' ', Last_Name) LIKE ?
    `;
    const searchTerm = `%${term}%`;

    connection.query(query, [searchTerm, searchTerm], (err, results) => {
        if (err) {
            console.error('Error searching patients:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
    });
});

// Route to update patient data
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
            return res.status(500).json({ message: 'Database error', error: err.sqlMessage || err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        console.log('Patient data updated successfully:', results);
        res.status(200).json({ message: 'Patient data updated successfully' });
    });
});

// Route to delete a patient
router.delete('/delete/:nic', (req, res) => {
    const { nic } = req.params;

    const query = 'DELETE FROM patient WHERE NIC = ?';

    connection.query(query, [nic], (err, results) => {
        if (err) {
            console.error('Error deleting patient:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
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
            return res.status(500).json({ message: 'Database error', error: err.sqlMessage || err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        console.log('Profile picture updated successfully:', results);
        res.status(200).json({ message: 'Profile picture updated successfully', profilePicture });
    });
});

module.exports = router;
