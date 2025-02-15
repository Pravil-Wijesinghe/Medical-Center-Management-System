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

const getStaffDetails = (req, res) => {
    const { staffId } = req.params;

    // Validate staffId
    if (!staffId) {
        return res.status(400).json({ message: 'Staff ID is required' });
    }

    // SQL query to fetch staff details along with user data
    const sql = `
        SELECT 
            staff.staffId, staff.firstName, staff.lastName, staff.role, staff.phoneNumber, staff.email,
            user.userId, user.username, user.password, user.profilePicture
        FROM staff
        INNER JOIN user ON staff.userId = user.userId
        WHERE staff.staffId = ?`;

    db.query(sql, [staffId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        return res.json({ staff: results[0] });
    });
};

module.exports = { addStaffMember, getStaffDetails };