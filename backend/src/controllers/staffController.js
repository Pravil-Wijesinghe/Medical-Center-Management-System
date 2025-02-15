const bcrypt = require('bcryptjs');
const db = require('../config/db');

const addStaffMember = (req, res) => {
    const { firstName, lastName, role, phoneNumber, email, username, password, profilePicture } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !role || !email || !username || !password) {
        return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Validate staff role
    const validRoles = ['Nurse', 'Attendant', 'Cashier'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role. Role must be Nurse, Attendant, or Cashier' });
    }

    // Hash the password before storing
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Error hashing password' });

        // Insert into `user` table
        const addUserQuery = `INSERT INTO user (role, username, password, profilePicture) VALUES (?, ?, ?, ?)`;
        db.query(addUserQuery, ['Staff', username, hashedPassword, profilePicture], (err, result) => {
            if (err) return res.status(500).json({ message: 'Error adding user' });

            const userId = result.insertId; // Get the inserted user ID

            // Insert into `staff` table
            const addStaffQuery = `INSERT INTO staff (userId, firstName, lastName, role, phoneNumber, email) VALUES (?, ?, ?, ?, ?, ?)`;
            db.query(addStaffQuery, [userId, firstName, lastName, role, phoneNumber, email], (err) => {
                if (err) return res.status(500).json({ message: 'Error adding staff member' });

                return res.status(201).json({ message: 'Staff member added successfully' });
            });
        });
    });
};

module.exports = { addStaffMember };