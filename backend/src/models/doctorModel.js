const db = require('../config/db');

const addDoctor = (userId, firstName, lastName, specialization, phoneNumber, email, callback) => {
    const sql = 'INSERT INTO doctor (userId, firstName, lastName, specialization, phoneNumber, email) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [userId, firstName, lastName, specialization, phoneNumber, email], (err, result) => {
        if (err) return callback(err);
        callback(null);
    });
};

module.exports = { addDoctor };