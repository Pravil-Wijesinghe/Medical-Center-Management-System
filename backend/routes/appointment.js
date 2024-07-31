// backend/routes/appointment.js
const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');
const { getDoctors, makeAppointment, getAppointments, updateAppointment, deleteAppointment } = require('../controllers/appointment');
const validateAppointmentData = require('../Validations/validateAppointment');
const validateAppointmentDeletion = require('../Validations/validateAppointmentDeletion');

// Route to fetch all doctors
router.get('/doctors', getDoctors);
// Route to make a new appointment
router.post('/make', makeAppointment);

// Route to fetch appointments based on optional query parameters
router.get('/', getAppointments);
// Route to update an existing appointment by ID
router.put('/:id', updateAppointment);
// Route to delete an appointment by ID
router.delete('/:id', deleteAppointment);

// Route to create a new appointment with validation and checks
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

// Route to fetch appointments for a specific patient based on NIC
router.get('/patient/:nic', (req, res) => {
    const { nic } = req.params;
    const query = `
        SELECT a.*, d.First_Name AS Doctor_First_Name, d.Last_Name AS Doctor_Last_Name
        FROM appointment a
        JOIN doctor d ON a.Doctor_NIC = d.NIC
        WHERE a.Patient_NIC = ?`;

    connection.query(query, [nic], (err, results) => {
        if (err) {
            console.error('Error fetching appointments:', err);
            res.status(500).json({ message: 'Database error', error: err });
        } else {
            res.status(200).json(results);
        }
    });
});

// Route to delete multiple appointments
router.delete('/delete', (req, res) => {
    const { appointments } = req.body;
  
    const validation = validateAppointmentDeletion({ appointments });
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }
  
    const placeholders = appointments.map(() => '(?, ?, ?)').join(', ');
    const values = appointments.flatMap(appt => [
      appt.Appointment_Number,
      appt.Date,
      appt.Doctor_NIC
    ]);
  
    const query = `
      DELETE FROM appointment 
      WHERE (Appointment_Number, Date, Doctor_NIC) IN (${placeholders})
    `;
  
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error deleting appointments:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      console.log('Delete results:', results);
      res.status(200).json({ message: 'Appointments deleted successfully' });
    });
  });
  
  

module.exports = router;
