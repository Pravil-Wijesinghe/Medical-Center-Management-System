// backend/routes/addPayment.js

const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');

router.post('/', (req, res) => {
    const { Doctor_NIC, Patients, Payment, Issue_Date } = req.body;

    const query = `
        INSERT INTO payment (Doctor_NIC, Patients, Payment, Issue_Date)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE Patients = VALUES(Patients), Payment = VALUES(Payment)
    `;
    const values = [Doctor_NIC, Patients, Payment, Issue_Date];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error adding payment:', error.sqlMessage || error.message);
            return res.status(500).json({ message: 'Server error', error: error.sqlMessage || error.message });
        }
        res.status(200).json({ message: 'Payment added successfully' });
    });
});

module.exports = router;
