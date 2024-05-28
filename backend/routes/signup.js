const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { firstName, lastName, nicNumber, mobileNumber, email, dateOfBirth, gender, password } = req.body;

    // Validate input data
    if (!firstName || !lastName || !nicNumber || !mobileNumber || !email || !dateOfBirth || !gender || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the patient into the database
        const query = 'INSERT INTO patient (First_Name, Last_Name, NIC, Mobile_Number, Email, DOB, Gender, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [firstName, lastName, nicNumber, mobileNumber, email, dateOfBirth, gender, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error inserting patient:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            res.status(201).json({ message: 'Patient registered successfully' });
        });
    } catch (err) {
        console.error('Error during sign-up:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
