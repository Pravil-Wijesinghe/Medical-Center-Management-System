// backend/routes/appointment.js
const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');
const { getDoctors, makeAppointment, getAppointments, updateAppointment, deleteAppointment } = require('../controllers/appointment');
const validateAppointmentData = require('../Validations/validateAppointment');
const validateAppointmentDeletion = require('../Validations/validateAppointmentDeletion');

router.get('/doctors', getDoctors);
router.post('/make', makeAppointment);

router.get('/', getAppointments);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

router.post('/create', (req, res) => {
    const { date, time, diseaseReport, patientNIC, relationship, doctorNIC } = req.body;

    // Validate input data
    const validation = validateAppointmentData({ date, time, patientNIC, doctorNIC });
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }

    // Check for full appointments
    const checkAppointmentsQuery = `
        SELECT COUNT(*) AS count
        FROM appointment
        WHERE Date = ? AND Time = ? AND Doctor_NIC = ?
    `;

    connection.query(checkAppointmentsQuery, [date, time, doctorNIC], (err, results) => {
        if (err) {
            console.error('Error checking appointments:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        const maxAppointments = time === 'morning' ? 30 : 45;
        if (results[0].count >= maxAppointments) {
            return res.status(400).json({ message: "Can't make an appointment. Appointments are full." });
        }

        // Get the current highest appointment number for the given date and doctor
        const getMaxAppointmentNumberQuery = `
            SELECT MAX(Appointment_Number) AS maxAppointmentNumber
            FROM appointment
            WHERE Date = ? AND Doctor_NIC = ?
        `;

        connection.query(getMaxAppointmentNumberQuery, [date, doctorNIC], (err, results) => {
            if (err) {
                console.error('Error getting max appointment number:', err);
                return res.status(500).json({ message: 'Database error', error: err });
            }

            const maxAppointmentNumber = results[0].maxAppointmentNumber || 0;
            const newAppointmentNumber = maxAppointmentNumber + 1;

            // Insert new appointment with generated appointment number
            const insertQuery = `
                INSERT INTO appointment (Appointment_Number, Date, Time, Disease_Report, Patient_NIC, Relationship, Doctor_NIC)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            connection.query(insertQuery, [newAppointmentNumber, date, time, diseaseReport, patientNIC, relationship, doctorNIC], (err, results) => {
                if (err) {
                    console.error('Error inserting appointment:', err);
                    return res.status(500).json({ message: 'Database error', error: err });
                }
                res.status(200).json({ message: 'Appointment created successfully' });
            });
        });
    });
});

module.exports = router;
