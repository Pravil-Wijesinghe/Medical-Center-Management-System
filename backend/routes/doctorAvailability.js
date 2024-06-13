// backend/routes/doctorAvailability.js
const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');

// Fetch doctor details and their availability
router.get('/:nic', (req, res) => {
    const { nic } = req.params;
    
    const doctorQuery = 'SELECT * FROM doctor WHERE NIC = ?';
    const availabilityQuery = 'SELECT * FROM doctor_availability WHERE Doctor_NIC = ?';

    connection.query(doctorQuery, [nic], (err, doctorResults) => {
        if (err) {
            console.error('Error fetching doctor details:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        connection.query(availabilityQuery, [nic], (err, availabilityResults) => {
            if (err) {
                console.error('Error fetching doctor availability:', err);
                return res.status(500).json({ message: 'Database error', error: err });
            }

            res.status(200).json({ doctor: doctorResults[0], availability: availabilityResults });
        });
    });
});

// Update doctor availability
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { availability, start_time, close_time, note } = req.body;

    const query = `
        UPDATE doctor_availability 
        SET availability = ?, start_time = ?, close_time = ?, note = ? 
        WHERE id = ?`;

    connection.query(query, [availability, start_time, close_time, note, id], (err, results) => {
        if (err) {
            console.error('Error updating availability:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ message: 'Availability updated successfully' });
    });
});

// Delete doctor availability
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM doctor_availability WHERE id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting availability:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ message: 'Availability deleted successfully' });
    });
});

module.exports = router;
