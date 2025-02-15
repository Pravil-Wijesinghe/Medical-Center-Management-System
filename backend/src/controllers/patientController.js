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

const updatePatient = (req, res) => {
    const patientId = req.params.patientId; // Get patientId from URL params
    const { firstName, lastName, address, phoneNumber, email, username, profilePicture } = req.body;

    if (!firstName || !lastName || !address || !phoneNumber || !email || !username) {
        return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // First, get the userId associated with the patientId
    const getUserIdQuery = 'SELECT userId FROM patient WHERE patientId = ?';

    db.query(getUserIdQuery, [patientId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length === 0) return res.status(404).json({ message: 'Patient not found' });

        const userId = results[0].userId;

        // Update `patient` table
        const updatePatientQuery = `
            UPDATE patient 
            SET firstName = ?, lastName = ?, address = ?, phoneNumber = ?, email = ?
            WHERE patientId = ?
        `;

        db.query(updatePatientQuery, [firstName, lastName, address, phoneNumber, email, patientId], (err) => {
            if (err) return res.status(500).json({ message: 'Error updating patient details' });

            // Update `user` table
            const updateUserQuery = `
                UPDATE user 
                SET username = ?, profilePicture = ?
                WHERE userId = ?
            `;

            db.query(updateUserQuery, [username, profilePicture, userId], (err) => {
                if (err) return res.status(500).json({ message: 'Error updating user details' });

                return res.json({ message: 'Patient details updated successfully' });
            });
        });
    });
};

module.exports = { getPatientDetails, getPatientsList, updatePatient };
