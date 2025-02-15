const db = require('../config/db');

const getUserByUsername = (username, callback) => {
    const sql = `SELECT * FROM user WHERE username = ?`;
    db.query(sql, [username], (err, results) => {
        if (err) return callback(err, null);
        return callback(null, results[0]); // Return only one user
    });
};

const addUser = (username, password, role, profilePicture, callback) => {
    const sql = 'INSERT INTO user (username, password, role, profilePicture) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, password, role, profilePicture], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.insertId);
    });
};

module.exports = { getUserByUsername, addUser };