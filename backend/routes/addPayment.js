// backend/routes/addPayment.js

const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');

// Route handler to add a new payment record
router.post('/', (req, res) => {
    // Destructure fields from request body
    const { Doctor_NIC, Patients, Payment, Issue_Date } = req.body;

    // SQL query to insert a new payment record or update if a duplicate key exists
    const query = `
        INSERT INTO payment (Doctor_NIC, Patients, Payment, Issue_Date)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE Patients = VALUES(Patients), Payment = VALUES(Payment)
    `;
    // Values to be inserted into the query
    const values = [Doctor_NIC, Patients, Payment, Issue_Date];

    // Execute the query
    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error adding payment:', error.sqlMessage || error.message);
            return res.status(500).json({ message: 'Server error', error: error.sqlMessage || error.message });
        }
        res.status(200).json({ message: 'Payment added successfully' });
    });
});

module.exports = router;
