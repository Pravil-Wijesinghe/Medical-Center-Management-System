const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');
const validateAppointmentData = require('../Validations/validateAppointment');

router.post('/create', (req, res) => {
    const { date, time, diseaseReport, patientNIC, relationship, doctorNIC } = req.body;

    // Validate input data
    const validation = validateAppointmentData({ date, time, diseaseReport, patientNIC, relationship, doctorNIC });
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }

    const query = `
        INSERT INTO appointment (Date, Time, Disease_Report, Patient_NIC, Relationship, Doctor_NIC)
        VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(query, [date, time, diseaseReport, patientNIC, relationship, doctorNIC], (err, results) => {
        if (err) {
            console.error('Error inserting appointment:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ message: 'Appointment created successfully' });
    });
});

module.exports = router;
