const db = require('../config/db');

const getPatientDetails = (req, res) => {
    const patientId = req.params.patientId;

    if (!patientId) {
        return res.status(400).json({ message: 'Patient ID is required' });
    }

    // SQL query to fetch patient details along with user details
    const sql = `
        SELECT 
            patient.patientId, patient.firstName, patient.lastName, patient.address, patient.phoneNumber, patient.email,
            user.userId, user.username, user.password, user.profilePicture
        FROM patient
        INNER JOIN user ON patient.userId = user.userId
        WHERE patient.patientId = ?
    `;

    db.query(sql, [patientId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        return res.json({ patient: results[0] });
    });
};

const getPatientsList = (req, res) => {
    console.log("Get Patients List API Hit");

    const { page = 1, limit = 10, search = '' } = req.body;
    const offset = (page - 1) * limit;
    const searchTerm = `%${search}%`;

    // SQL query to get patients with search and pagination
    const sql = `
        SELECT 
            patient.patientId, patient.firstName, patient.lastName, patient.address, patient.phoneNumber, patient.email,
            user.userId, user.username, user.profilePicture
        FROM patient
        INNER JOIN user ON patient.userId = user.userId
        WHERE 
            patient.firstName LIKE ? 
            OR patient.lastName LIKE ? 
            OR patient.phoneNumber LIKE ? 
            OR patient.email LIKE ? 
            OR user.username LIKE ?
        LIMIT ? OFFSET ?
    `;

    db.query(sql, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, limit, offset], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        // Get the total number of patients for pagination
        const countSql = `
            SELECT COUNT(*) AS total 
            FROM patient
            INNER JOIN user ON patient.userId = user.userId
            WHERE 
                patient.firstName LIKE ? 
                OR patient.lastName LIKE ? 
                OR patient.phoneNumber LIKE ? 
                OR patient.email LIKE ? 
                OR user.username LIKE ?
        `;

        db.query(countSql, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm], (err, countResults) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }

            const totalPatients = countResults[0].total;
            const totalPages = Math.ceil(totalPatients / limit);

            return res.json({
                patients: results,
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalPatients: totalPatients
                }
            });
        });
    });
};

module.exports = { getPatientDetails, getPatientsList };
