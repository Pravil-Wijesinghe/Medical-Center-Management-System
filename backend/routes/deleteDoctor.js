// backend/routes/deleteDoctor.js

const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');

// Route to delete a doctor by NIC (National Identity Card)
router.delete('/:nic', (req, res) => {
    const { nic } = req.params;

    const query = 'DELETE FROM doctor WHERE NIC = ?';
    const values = [nic];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error deleting doctor:', error.sqlMessage || error.message);
            return res.status(500).json({ message: 'Server error', error: error.sqlMessage || error.message });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
    });
});

module.exports = router;
