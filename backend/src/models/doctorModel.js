const db = require('../config/db');

const addDoctor = (userId, firstName, lastName, specialization, phoneNumber, email, callback) => {
    const sql = 'INSERT INTO doctor (userId, firstName, lastName, specialization, phoneNumber, email) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [userId, firstName, lastName, specialization, phoneNumber, email], (err, result) => {
        if (err) return callback(err);
        callback(null);
    });
};

// Get doctor details from the database
const getDoctorById = (doctorId, callback) => {
    const sql = `
        SELECT user.userId, user.username, user.profilePicture, doctor.firstName, doctor.lastName, doctor.specialization, doctor.phoneNumber, doctor.email
        FROM user
        INNER JOIN doctor ON user.userId = doctor.userId
        WHERE doctor.doctorId = ?`;

    db.query(sql, [doctorId], (err, results) => {
        if (err) return callback(err, null);
        return callback(null, results[0]); // Return doctor details
    });
};

// Get a list of doctors with search and pagination
const getDoctorsList = (searchTerm, limit, offset, callback) => {
    let sql = `
        SELECT user.userId, user.username, user.profilePicture, doctor.firstName, doctor.lastName, doctor.specialization, doctor.phoneNumber, doctor.email
        FROM user
        INNER JOIN doctor ON user.userId = doctor.userId
        WHERE doctor.firstName LIKE ? OR doctor.lastName LIKE ? OR doctor.specialization LIKE ? OR doctor.email LIKE ?
        LIMIT ? OFFSET ?
    `;
    
    db.query(sql, [searchTerm, searchTerm, searchTerm, searchTerm, limit, offset], (err, results) => {
        if (err) return callback(err, null);
        return callback(null, results); // Return the list of doctors
    });
};

// Count total doctors with search criteria
const countDoctors = (searchTerm, callback) => {
    const sql = `SELECT COUNT(*) as total FROM doctor WHERE firstName LIKE ? OR lastName LIKE ? OR specialization LIKE ? OR email LIKE ?`;
    
    db.query(sql, [searchTerm, searchTerm, searchTerm, searchTerm], (err, results) => {
        if (err) return callback(err, null);
        return callback(null, results[0].total); // Return the total count
    });
};

module.exports = { addDoctor, getDoctorById, getDoctorsList, countDoctors };