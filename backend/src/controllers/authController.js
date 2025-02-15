const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { getUserByUsername } = require('../models/userModel');

const loginUser = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    getUserByUsername(username, (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (!user) return res.status(401).json({ message: 'Invalid username or password' });

        // Compare passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Error comparing passwords' });

            if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });

            // Get user role-specific details
            getUserDetails(user.role, user.userId, (err, userDetails) => {
                if (err) return res.status(500).json({ message: 'Error fetching user details' });

                // Generate JWT token
                const token = jwt.sign(
                    { userId: user.userId, role: user.role, username: user.username },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                // Send response with user details and token
                return res.json({ token, user: { ...user, ...userDetails } });
            });
        });
    });
};

// Fetch user details from the respective role-specific table
const getUserDetails = (role, userId, callback) => {
    let sql = '';
    switch (role.toLowerCase()) {
        case 'admin':
            sql = 'SELECT adminId, firstName, lastName, email, phoneNumber FROM admin WHERE userId = ?';
            break;
        case 'doctor':
            sql = 'SELECT doctorId, firstName, lastName, specialization, phoneNumber, email FROM doctor WHERE userId = ?';
            break;
        case 'patient':
            sql = 'SELECT patientId, firstName, lastName, address, phoneNumber, email FROM patient WHERE userId = ?';
            break;
        case 'staff':
            sql = 'SELECT staffId, firstName, lastName, department, phoneNumber FROM staff WHERE userId = ?';
            break;
        default:
            return callback(null, {}); // No additional details for unknown roles
    }

    db.query(sql, [userId], (err, results) => {
        if (err) return callback(err, null);
        return callback(null, results[0] || {}); // Return user details or an empty object
    });
};

const registerPatient = (req, res) => {
    const { firstName, lastName, username, address, phoneNumber, email, password } = req.body;

    // Check if required fields are present
    if (!firstName || !lastName || !username || !address || !phoneNumber || !password) {
        return res.status(400).json({ message: 'All fields except email are required' });
    }

    // Check if username already exists
    const checkUserQuery = 'SELECT * FROM user WHERE username = ?';
    db.query(checkUserQuery, [username], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length > 0) return res.status(400).json({ message: 'Username already exists' });

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: 'Error hashing password' });

            // Insert into `user` table
            const insertUserQuery = 'INSERT INTO user (username, password, role) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [username, hashedPassword, 'Patient'], (err, result) => {
                if (err) return res.status(500).json({ message: 'Error inserting user' });

                const userId = result.insertId; // Get the inserted user ID

                // Insert into `patient` table
                const insertPatientQuery = `
                    INSERT INTO patient (userId, firstName, lastName, address, phoneNumber, email)
                    VALUES (?, ?, ?, ?, ?, ?)`;
                db.query(insertPatientQuery, [userId, firstName, lastName, address, phoneNumber, email || null], (err) => {
                    if (err) return res.status(500).json({ message: 'Error inserting patient details' });

                    res.status(201).json({ message: 'Patient registered successfully' });
                });
            });
        });
    });
};

module.exports = { loginUser, registerPatient };