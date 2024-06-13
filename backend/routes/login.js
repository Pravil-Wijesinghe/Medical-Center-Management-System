// backend/routes/login.js
const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');
const bcrypt = require('bcrypt');
const validateLoginData = require('../Validations/validateLogin');

router.post('/', async (req, res) => {
    const { nic, password } = req.body;

    // Validate input data
    const validation = validateLoginData({ nic, password });
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }

    try {
        // Helper function to validate user
        const validateUser = async (query, nic, userType) => {
            return new Promise((resolve, reject) => {
                connection.query(query, [nic], async (err, results) => {
                    if (err) return reject(err);
                    if (results.length === 0) return resolve(null);

                    const user = results[0];
                    const isMatch = await bcrypt.compare(password, user.Password);
                    if (!isMatch) return resolve(null);

                    resolve({ user, userType });
                });
            });
        };

        // Query all three tables
        const patientQuery = 'SELECT * FROM patient WHERE NIC = ?';
        const doctorQuery = 'SELECT * FROM doctor WHERE NIC = ?';
        const receptionistQuery = 'SELECT * FROM receptionist WHERE NIC = ?';

        const patient = await validateUser(patientQuery, nic, 'patient');
        const doctor = await validateUser(doctorQuery, nic, 'doctor');
        const receptionist = await validateUser(receptionistQuery, nic, 'receptionist');

        let user = null;
        if (patient) user = patient;
        else if (doctor) user = doctor;
        else if (receptionist) user = receptionist;

        if (!user) {
            console.log('Invalid NIC or password for NIC:', nic);
            return res.status(401).json({ message: 'Invalid NIC or password.' });
        }

        // Success, send user data based on role
        const { userType, user: userData } = user;
        delete userData.Password; // Remove password from user data

        if (userType === 'patient') {
            res.status(200).json({ message: 'Login successful', redirectUrl: '/PatientProfile', user: userData });
        } else if (userType === 'doctor') {
            res.status(200).json({ message: 'Login successful', redirectUrl: '/DoctorProfile', user: userData });
        } else if (userType === 'receptionist') {
            res.status(200).json({ message: 'Login successful', redirectUrl: '/ReceptionistDashboard', user: userData });
        } else {
            res.status(400).json({ message: 'Unknown role' });
        }

    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
