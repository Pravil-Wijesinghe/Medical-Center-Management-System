const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { addUser } = require('../models/userModel');
const { addDoctor } = require('../models/doctorModel');

const addDoctorController = (req, res) => {
    const { firstName, lastName, username, password, specialization, phoneNumber, email, profilePicture } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !username || !password || !specialization || !email) {
        return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Hash the password before saving
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Error hashing password' });

        // Add user to `user` table
        addUser(username, hashedPassword, 'doctor', profilePicture, (err, userId) => {
            if (err) return res.status(500).json({ message: 'Error adding user' });

            // Add doctor to `doctor` table
            addDoctor(userId, firstName, lastName, specialization, phoneNumber, email, (err) => {
                if (err) return res.status(500).json({ message: 'Error adding doctor details' });

                return res.status(201).json({ message: 'Doctor added successfully' });
            });
        });
    });
};

// Get doctor details by doctorId
const getDoctorDetails = (req, res) => {
    const doctorId = req.params.doctorId;

    // SQL query to get doctor details
    const sql = `
        SELECT user.userId, user.username, user.profilePicture, doctor.firstName, doctor.lastName, doctor.specialization, doctor.phoneNumber, doctor.email
        FROM user
        INNER JOIN doctor ON user.userId = doctor.userId
        WHERE doctor.doctorId = ?`;

    db.query(sql, [doctorId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const doctorDetails = results[0];
        return res.json({ doctor: doctorDetails });
    });
};

module.exports = { addDoctorController, getDoctorDetails };