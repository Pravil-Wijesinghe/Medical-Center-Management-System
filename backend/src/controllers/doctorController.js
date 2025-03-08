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
        SELECT user.userId, user.username, user.profilePicture, user.isDelete, doctor.firstName, doctor.lastName, doctor.specialization, doctor.phoneNumber, doctor.email
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

// Get a list of doctors with pagination and search criteria
const getDoctorsList = (req, res) => {
    console.log("Get Doctors List API Hit");

    let { page = 1, limit = 10, search = '', isDelete } = req.body; // Default values
    const offset = (page - 1) * limit;
    const searchTerm = `%${search}%`;

    // Base query
    let sql = `
        SELECT user.userId, user.username, user.profilePicture, user.isDelete, 
               doctor.doctorId, doctor.firstName, doctor.lastName, doctor.specialization, 
               doctor.phoneNumber, doctor.email
        FROM user
        INNER JOIN doctor ON user.userId = doctor.userId
        WHERE 
            (doctor.firstName LIKE ? OR 
             doctor.lastName LIKE ? OR 
             doctor.specialization LIKE ? OR 
             doctor.email LIKE ?)
    `;

    let countSql = `
        SELECT COUNT(*) as total 
        FROM user 
        INNER JOIN doctor ON user.userId = doctor.userId
        WHERE 
            (doctor.firstName LIKE ? OR 
             doctor.lastName LIKE ? OR 
             doctor.specialization LIKE ? OR 
             doctor.email LIKE ?)
    `;

    // If isDelete is provided (not null/undefined), filter by it
    let queryParams = [searchTerm, searchTerm, searchTerm, searchTerm];
    if (isDelete !== undefined && isDelete !== null) {
        sql += " AND user.isDelete = ?";
        countSql += " AND user.isDelete = ?";
        queryParams.push(isDelete);
    }

    sql += " LIMIT ? OFFSET ?";
    queryParams.push(Number(limit), Number(offset));

    db.query(sql, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        db.query(countSql, queryParams.slice(0, -2), (err, countResults) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            const totalDoctors = countResults[0].total;
            const totalPages = Math.ceil(totalDoctors / limit);

            return res.json({
                doctors: results,
                pagination: {
                    currentPage: Number(page),
                    totalPages: totalPages,
                    totalDoctors: totalDoctors
                }
            });
        });
    });
};

const updateDoctor = (req, res) => {
    const doctorId = req.params.doctorId;
    const { firstName, lastName, specialization, phoneNumber, email, username, profilePicture } = req.body;

    if (!doctorId) {
        return res.status(400).json({ message: 'Doctor ID is required' });
    }

    // Start a transaction to update both tables
    db.beginTransaction(err => {
        if (err) {
            return res.status(500).json({ message: 'Transaction error' });
        }

        // Update the `doctor` table
        const doctorUpdateQuery = `
            UPDATE doctor 
            SET firstName = ?, lastName = ?, specialization = ?, phoneNumber = ?, email = ?
            WHERE doctorId = ?
        `;

        db.query(doctorUpdateQuery, [firstName, lastName, specialization, phoneNumber, email, doctorId], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).json({ message: 'Error updating doctor details' });
                });
            }

            // Find `userId` from `doctorId`
            const userIdQuery = `SELECT userId FROM doctor WHERE doctorId = ?`;
            db.query(userIdQuery, [doctorId], (err, results) => {
                if (err || results.length === 0) {
                    return db.rollback(() => {
                        res.status(500).json({ message: 'Error finding user ID' });
                    });
                }

                const userId = results[0].userId;

                // Update the `user` table
                const userUpdateQuery = `
                    UPDATE user 
                    SET username = ?, profilePicture = ?
                    WHERE userId = ?
                `;

                db.query(userUpdateQuery, [username, profilePicture, userId], (err, result) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ message: 'Error updating user details' });
                        });
                    }

                    // Commit the transaction if both updates succeed
                    db.commit(err => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(500).json({ message: 'Transaction commit error' });
                            });
                        }
                        res.json({ message: 'Doctor updated successfully' });
                    });
                });
            });
        });
    });
};

// Delete Doctor by doctorId
const deleteDoctor = (req, res) => {
    const doctorId = req.params.doctorId;

    // Fetch the userId of the doctor
    const getUserIdQuery = `SELECT userId FROM doctor WHERE doctorId = ?`;
    db.query(getUserIdQuery, [doctorId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error while fetching userId' });
        if (results.length === 0) return res.status(404).json({ message: 'Doctor not found' });

        const userId = results[0].userId;

        // Update isDelete to true in the doctor table
        const updateDoctorQuery = `UPDATE doctor SET isDelete = true WHERE doctorId = ?`;
        db.query(updateDoctorQuery, [doctorId], (err) => {
            if (err) return res.status(500).json({ message: 'Error updating doctor record' });

            // Update isDelete to true in the user table
            const updateUserQuery = `UPDATE user SET isDelete = true WHERE userId = ?`;
            db.query(updateUserQuery, [userId], (err) => {
                if (err) return res.status(500).json({ message: 'Error updating user record' });

                return res.status(200).json({ message: 'Doctor deleted successfully' });
            });
        });
    });
};

const addAvailableTime = (req, res) => {
    const { doctorId, availableDate, availableTime } = req.body;

    if (!doctorId || !availableDate || !availableTime) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = `
        INSERT INTO doctor_availability (doctorId, availableDate, availableTime)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [doctorId, availableDate, availableTime], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(201).json({ message: "Availability added successfully", availabilityId: result.insertId });
    });
};

module.exports = { addDoctorController, getDoctorDetails, getDoctorsList, updateDoctor, deleteDoctor, addAvailableTime };