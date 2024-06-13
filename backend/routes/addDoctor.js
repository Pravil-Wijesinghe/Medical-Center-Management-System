// backend/routes/addDoctor.js

const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');
const bcrypt = require('bcrypt');
const validateDoctorData = require('../Validations/validateDoctor');

router.post('/', async (req, res) => {
    const { NIC, First_Name, Last_Name, Specialization, Mobile_Number, Email, Address, Password, Doctor_Fee, Room } = req.body;

    // Validate input data
    const validation = validateDoctorData({ NIC, First_Name, Last_Name, Specialization, Mobile_Number, Email, Address, Password, Doctor_Fee, Room });
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }

    try {
        const hashedPassword = await bcrypt.hash(Password, 10);

        const query = `
            INSERT INTO doctor (NIC, First_Name, Last_Name, Specialization, Mobile_Number, Email, Address, Password, Doctor_Fee, Room)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [NIC, First_Name, Last_Name, Specialization, Mobile_Number, Email, Address, hashedPassword, Doctor_Fee, Room];

        connection.query(query, values, (error, results) => {
            if (error) {
                console.error('Error adding doctor:', error.sqlMessage || error.message);
                return res.status(500).json({ message: 'Server error', error: error.sqlMessage || error.message });
            }
            res.status(201).json({ message: 'Doctor added successfully' });
        });
    } catch (err) {
        console.error('Error during doctor addition:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
