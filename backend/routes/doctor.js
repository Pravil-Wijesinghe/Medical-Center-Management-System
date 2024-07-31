// backend/routes/doctor.js
const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');

// Route to fetch doctor's profile information by NIC
router.get('/:nic', (req, res) => {
    const { nic } = req.params;
    const query = 'SELECT * FROM doctor WHERE NIC = ?';

    connection.query(query, [nic], (err, results) => {
        if (err) {
            console.error('Error fetching doctor profile:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(results[0]);
    });
});

// Route to update doctor's profile information
router.put('/:nic', (req, res) => {
    const { nic } = req.params;
    const { First_Name, Last_Name, Specialization, Address, Mobile_Number, Email } = req.body;

    const query = `
        UPDATE doctor 
        SET First_Name = ?, Last_Name = ?, Specialization = ?, Address = ?, Mobile_Number = ?, Email = ? 
        WHERE NIC = ?`;

    connection.query(query, [First_Name, Last_Name, Specialization, Address, Mobile_Number, Email, nic], (err, results) => {
        if (err) {
            console.error('Error updating doctor profile:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ message: 'Profile updated successfully' });
    });
});


// Route to get a list of all doctors
router.get('/', (req, res) => {
    const query = 'SELECT NIC, First_Name, Last_Name FROM doctor';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching doctors:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});


module.exports = router;
