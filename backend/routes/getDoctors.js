// backend/routes/getDoctors.js

const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');

// Route to fetch all doctors
router.get('/', (req, res) => {
    const query = 'SELECT * FROM doctor';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching doctors:', error.sqlMessage || error.message);
            return res.status(500).json({ message: 'Server error', error: error.sqlMessage || error.message });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
