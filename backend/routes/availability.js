// backend/routes/availability.js
const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');

// Save doctor's availability
router.post('/', (req, res) => {
    const { Doctor_NIC, date, availability, start_time, close_time, note } = req.body;

    const query = `
        INSERT INTO doctor_availability (Doctor_NIC, date, availability, start_time, close_time, note)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        availability = VALUES(availability), 
        start_time = VALUES(start_time), 
        close_time = VALUES(close_time), 
        note = VALUES(note)`;

    connection.query(query, [Doctor_NIC, date, availability, start_time, close_time, note], (err, results) => {
        if (err) {
            console.error('Error saving availability:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ message: 'Availability saved successfully' });
    });
});

module.exports = router;
