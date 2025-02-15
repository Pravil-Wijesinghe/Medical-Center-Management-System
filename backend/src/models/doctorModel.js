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

module.exports = { addDoctor, getDoctorById };