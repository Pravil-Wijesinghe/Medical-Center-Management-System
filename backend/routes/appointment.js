const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');
const validateAppointmentData = require('../Validations/validateAppointment');
const validateAppointmentDeletion = require('../Validations/validateAppointmentDeletion');

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

// Get all appointments for a doctor
router.get('/doctor/:nic', (req, res) => {
    const { nic } = req.params;
    const query = `
        SELECT a.*, p.First_Name AS Patient_FirstName, p.Last_Name AS Patient_LastName, p.Mobile_Number
        FROM appointment a
        JOIN patient p ON a.Patient_NIC = p.NIC
        WHERE a.Doctor_NIC = ?`;

    connection.query(query, [nic], (err, results) => {
        if (err) {
            console.error('Error fetching appointments:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
    });
});

// Update an appointment
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Disease_Report, Diagnosis, Treatment_Plan } = req.body;

    const query = `
        UPDATE appointment 
        SET Disease_Report = ?, Diagnosis = ?, Treatment_Plan = ? 
        WHERE Appointment_Number = ?`;

    connection.query(query, [Disease_Report, Diagnosis, Treatment_Plan, id], (err, results) => {
        if (err) {
            console.error('Error updating appointment:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ message: 'Appointment updated successfully' });
    });
});

// Filter appointments by date and time
router.get('/filter', (req, res) => {
    const { date, time } = req.query;
    let query = `
        SELECT a.*, p.First_Name AS Patient_FirstName, p.Last_Name AS Patient_LastName, p.Mobile_Number
        FROM appointment a
        JOIN patient p ON a.Patient_NIC = p.NIC
        WHERE a.Date = ? AND a.Time = ?`;
    const params = [date, time];

    if (!date && !time) {
        query = `
            SELECT a.*, p.First_Name AS Patient_FirstName, p.Last_Name AS Patient_LastName, p.Mobile_Number
            FROM appointment a
            JOIN patient p ON a.Patient_NIC = p.NIC`;
    } else if (!date) {
        query = `
            SELECT a.*, p.First_Name AS Patient_FirstName, p.Last_Name AS Patient_LastName, p.Mobile_Number
            FROM appointment a
            JOIN patient p ON a.Patient_NIC = p.NIC
            WHERE a.Time = ?`;
        params.length = 0;
        params.push(time);
    } else if (!time) {
        query = `
            SELECT a.*, p.First_Name AS Patient_FirstName, p.Last_Name AS Patient_LastName, p.Mobile_Number
            FROM appointment a
            JOIN patient p ON a.Patient_NIC = p.NIC
            WHERE a.Date = ?`;
        params.length = 0;
        params.push(date);
    }

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Error fetching appointments:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
    });
});


// Route to delete specific appointments
router.delete('/delete', (req, res) => {
    const { appointments } = req.body;

    console.log('Received appointments for deletion:', appointments);

    // Validate input data
    const validation = validateAppointmentDeletion({ appointments });
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }

    const placeholders = appointments.map(() => '(?, ?, ?)').join(', ');
    const values = appointments.flatMap(appt => [
        appt.Appointment_Number,
        new Date(appt.Date).toISOString().split('T')[0], // Ensure date is in correct format
        appt.Doctor_NIC
    ]);

    const query = `
        DELETE FROM appointment 
        WHERE (Appointment_Number, Date, Doctor_NIC) IN (${placeholders})
    `;

    console.log('Executing query:', query);
    console.log('With values:', values);

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error deleting appointments:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        console.log('Delete results:', results);
        res.status(200).json({ message: 'Appointments deleted successfully' });
    });
});


router.get('/patient/:nic', (req, res) => {
    const { nic } = req.params;
    const query = `
        SELECT 
            a.Appointment_Number,
            DATE_FORMAT(a.Date, '%Y-%m-%d') as Date,
            a.Time,
            a.Disease_Report,
            a.Patient_NIC,
            a.Relationship,
            a.Doctor_NIC,
            d.First_Name AS Doctor_First_Name,
            d.Last_Name AS Doctor_Last_Name
        FROM appointment a
        JOIN doctor d ON a.Doctor_NIC = d.NIC
        WHERE a.Patient_NIC = ?
    `;

    connection.query(query, [nic], (err, results) => {
        if (err) {
            console.error('Error fetching appointments:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
    });
});



module.exports = router;
