// backend/routes/dashboard.js
const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');

// Route to get total counts for patients, doctors, medicines, and upcoming appointments
router.get('/counts', (req, res) => {
    const queries = {
        patients: 'SELECT COUNT(*) AS totalPatients FROM patient',
        doctors: 'SELECT COUNT(*) AS totalDoctors FROM doctor',
        medicines: 'SELECT COUNT(*) AS totalMedicines FROM medicine',
        upcomingAppointments: `SELECT COUNT(*) AS totalAppointments FROM appointment WHERE Date > CURDATE()`
    };

    const results = {};

    connection.query(queries.patients, (err, rows) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });

        results.totalPatients = rows[0].totalPatients;

        connection.query(queries.doctors, (err, rows) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err });

            results.totalDoctors = rows[0].totalDoctors;

            connection.query(queries.medicines, (err, rows) => {
                if (err) return res.status(500).json({ message: 'Database error', error: err });

                results.totalMedicines = rows[0].totalMedicines;

                connection.query(queries.upcomingAppointments, (err, rows) => {
                    if (err) return res.status(500).json({ message: 'Database error', error: err });

                    results.totalAppointments = rows[0].totalAppointments;
                    res.status(200).json(results);
                });
            });
        });
    });
});

// Route to get today's appointments divided into morning and evening
router.get('/today-appointments', (req, res) => {
    const query = `
        SELECT 
            COUNT(*) AS count, 
            CASE 
                WHEN TIME(Time) < '12:00:00' THEN 'Morning' 
                ELSE 'Evening' 
            END AS timePeriod 
        FROM appointment 
        WHERE Date = CURDATE() 
        GROUP BY timePeriod
    `;

    connection.query(query, (err, rows) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });

        const appointments = { Morning: 0, Evening: 0 };

        rows.forEach(row => {
            appointments[row.timePeriod] = row.count;
        });

        res.status(200).json(appointments);
    });
});

module.exports = router;
