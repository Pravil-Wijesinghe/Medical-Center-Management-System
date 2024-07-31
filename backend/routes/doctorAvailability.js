// backend/routes/doctorAvailability.js
const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');

// Route to fetch doctor details and their availability
router.get('/:doctorNIC', (req, res) => {
    const doctorNIC = req.params.doctorNIC;

    const doctorQuery = 'SELECT * FROM doctor WHERE NIC = ?';
    const availabilityQuery = 'SELECT * FROM doctor_availability WHERE Doctor_NIC = ?';

    connection.query(doctorQuery, [doctorNIC], (err, doctorResults) => {
        if (err) {
            console.error('Error fetching doctor:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (doctorResults.length === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        connection.query(availabilityQuery, [doctorNIC], (err, availabilityResults) => {
            if (err) {
                console.error('Error fetching availability:', err);
                return res.status(500).json({ message: 'Database error', error: err });
            }

            res.status(200).json({ doctor: doctorResults[0], availability: availabilityResults });
        });
    });
});

// Route to update doctor availability
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

// Route to delete doctor availability
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
