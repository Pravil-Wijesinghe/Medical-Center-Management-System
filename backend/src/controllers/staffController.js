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

const getStaffList = (req, res) => {
    console.log("Get Staff List API Hit");

    const { page = 1, limit = 10, search = '' } = req.body; // Default values
    const offset = (page - 1) * limit;
    const searchTerm = `%${search}%`;

    // SQL query to fetch staff members with search and pagination
    let sql = `
        SELECT 
            staff.staffId, staff.firstName, staff.lastName, staff.role, staff.phoneNumber, staff.email,
            user.userId, user.username, user.profilePicture
        FROM staff
        INNER JOIN user ON staff.userId = user.userId
        WHERE 
            staff.firstName LIKE ? OR 
            staff.lastName LIKE ? OR 
            staff.role LIKE ? OR 
            staff.phoneNumber LIKE ? OR 
            staff.email LIKE ? OR 
            user.username LIKE ?
        LIMIT ? OFFSET ?`;

    db.query(sql, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, limit, offset], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        // Query to get total count for pagination
        const countSql = `
            SELECT COUNT(*) as total 
            FROM staff 
            INNER JOIN user ON staff.userId = user.userId
            WHERE 
                staff.firstName LIKE ? OR 
                staff.lastName LIKE ? OR 
                staff.role LIKE ? OR 
                staff.phoneNumber LIKE ? OR 
                staff.email LIKE ? OR 
                user.username LIKE ?`;

        db.query(countSql, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm], (err, countResults) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }

            const totalStaff = countResults[0].total;
            const totalPages = Math.ceil(totalStaff / limit);

            return res.json({
                staff: results,
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalStaff: totalStaff
                }
            });
        });
    });
};

const updateStaffMember = (req, res) => {
    const staffId = req.params.staffId;
    const { firstName, lastName, role, phoneNumber, email, username, profilePicture } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !role || !phoneNumber || !email || !username) {
        return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if role is valid
    const validRoles = ['Nurse', 'Attendant', 'Cashier'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role. Role must be Nurse, Attendant, or Cashier.' });
    }

    // First, fetch userId from staffId
    const getUserIdQuery = `SELECT userId FROM staff WHERE staffId = ?`;
    db.query(getUserIdQuery, [staffId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error while fetching userId' });
        if (results.length === 0) return res.status(404).json({ message: 'Staff member not found' });

        const userId = results[0].userId;

        // Update staff table
        const updateStaffQuery = `
            UPDATE staff 
            SET firstName = ?, lastName = ?, role = ?, phoneNumber = ?, email = ? 
            WHERE staffId = ?`;
        
        db.query(updateStaffQuery, [firstName, lastName, role, phoneNumber, email, staffId], (err) => {
            if (err) return res.status(500).json({ message: 'Error updating staff details' });

            // Update user table
            const updateUserQuery = `
                UPDATE user 
                SET username = ?, profilePicture = ? 
                WHERE userId = ?`;

            db.query(updateUserQuery, [username, profilePicture, userId], (err) => {
                if (err) return res.status(500).json({ message: 'Error updating user details' });

                return res.status(200).json({ message: 'Staff member updated successfully' });
            });
        });
    });
};

const deleteStaffMember = (req, res) => {
    const staffId = req.params.staffId;

    // Fetch the userId of the staff member from the staff table
    const getUserIdQuery = `SELECT userId FROM staff WHERE staffId = ?`;
    db.query(getUserIdQuery, [staffId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error while fetching userId' });
        if (results.length === 0) return res.status(404).json({ message: 'Staff member not found' });

        const userId = results[0].userId;

        // Update isDelete to true in the staff table
        const updateStaffQuery = `UPDATE staff SET isDelete = true WHERE staffId = ?`;
        db.query(updateStaffQuery, [staffId], (err) => {
            if (err) return res.status(500).json({ message: 'Error updating staff record' });

            // Update isDelete to true in the user table
            const updateUserQuery = `UPDATE user SET isDelete = true WHERE userId = ?`;
            db.query(updateUserQuery, [userId], (err) => {
                if (err) return res.status(500).json({ message: 'Error updating user record' });

                return res.status(200).json({ message: 'Staff member deleted successfully' });
            });
        });
    });
};

const getStaffCount = (req, res) => {
    const query = `SELECT COUNT(*) AS totalStaff FROM staff`;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        res.status(200).json({ totalStaff: result[0].totalStaff });
    });
};

const getStaffCountByRole = (req, res) => {
    const query = `
        SELECT role, COUNT(*) AS count 
        FROM staff 
        WHERE role IN ('Nurse', 'Attendant', 'Cashier') 
        GROUP BY role
    `;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        // Convert the result into a key-value object
        const roleCounts = {};
        result.forEach(row => {
            roleCounts[row.role] = row.count;
        });

        res.status(200).json(roleCounts);
    });
};

module.exports = { addStaffMember, getStaffDetails, getStaffList, updateStaffMember, deleteStaffMember, getStaffCount, getStaffCountByRole };