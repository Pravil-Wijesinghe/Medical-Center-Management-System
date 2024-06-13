// backend/routes/receptionist.js
const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');

// Update receptionist data
router.put('/update', (req, res) => {
    const { nic, firstName, lastName, address, email, contactNumber } = req.body;

    const query = `
        UPDATE receptionist
        SET First_Name = ?, Last_Name = ?, Address = ?, Email = ?, Contact_Number = ?
        WHERE NIC = ?`;

    connection.query(query, [firstName, lastName, address, email, contactNumber, nic], (err, results) => {
        if (err) {
            console.error('Error updating receptionist data:', err);
            return res.status(500).json({ message: 'Database error', error: err.sqlMessage || err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Receptionist not found' });
        }
        res.status(200).json({ message: 'Receptionist data updated successfully' });
    });
});

module.exports = router;
