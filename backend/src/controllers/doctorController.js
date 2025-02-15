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

module.exports = { addDoctorController };