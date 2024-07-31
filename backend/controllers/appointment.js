const connection = require('../DBConnect');
const validateAppointmentDeletion = require('../Validations/validateAppointmentDeletion');

// Handler to fetch a list of doctors with their NIC and full names
const getDoctors = (req, res) => {
    // SQL query to select NIC and concatenated first and last names of doctors
    const query = 'SELECT NIC, CONCAT(First_Name, " ", Last_Name) AS Name FROM doctor';
    connection.query(query, (err, results) => {
        if (err) {
            // Log error and send internal server error response
            console.error('Error fetching doctors:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // Send the results as JSON response
        res.status(200).json(results);
    });
};

// Handler to create a new appointment
const makeAppointment = (req, res) => {
    const { date, time, diseaseReport, patientNIC, relationship, doctorNIC, forFamilyMembers } = req.body;

    // SQL query to insert a new appointment into the database
    const query = `INSERT INTO appointment (Date, Time, Disease_Report, Patient_NIC, Relationship, Doctor_NIC)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [date, time, diseaseReport, patientNIC, forFamilyMembers ? relationship : null, doctorNIC];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error making appointment:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // Send success message with the ID of the newly created appointment
        res.status(201).json({ message: 'Appointment made successfully', id: result.insertId });
    });
};

// Utility function to format date into YYYY-MM-DD format
const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    // Add leading zero if month or day is single digit
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

// Handler to fetch appointments with optional date and time filters
const getAppointments = (req, res) => {
    const { date, time } = req.query;
    let query = 'SELECT * FROM appointment';
    const queryParams = [];

    // Add date filter to query if provided
    if (date) {
        query += ' WHERE Date = ?';
        queryParams.push(date);
    }
    // Add time filter to query if provided
    if (time) {
        query += date ? ' AND Time = ?' : ' WHERE Time = ?';
        queryParams.push(time);
    }

    connection.query(query, queryParams, (err, results) => {
        // Log error and send internal server error response
        if (err) {
            console.error('Error fetching appointments:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // Format date in results and send as JSON response
        results.forEach(appointment => {
            appointment.Date = formatDate(appointment.Date);
        });
        res.status(200).json(results);
    });
};

// Handler to update an existing appointment
const updateAppointment = (req, res) => {
    const { id } = req.params;
    const { Disease_Report, Diagnosis, Treatment_Plan, Payment } = req.body;

    const query = `UPDATE appointment SET Disease_Report = ?, Diagnosis = ?, Treatment_Plan = ?, Payment = ? WHERE Appointment_Number = ?`;
    const values = [Disease_Report, Diagnosis, Treatment_Plan, Payment, id];

    connection.query(query, values, (err) => {
        if (err) {
            console.error('Error updating appointment:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json({ message: 'Appointment updated successfully' });
    });
};

// Handler to delete multiple appointments
const deleteAppointment = (req, res) => {
    const { appointments } = req.body;

    // Check if appointments is an array
    if (!Array.isArray(appointments)) {
        console.error('Expected appointments to be an array:', appointments);
        return res.status(400).json({ message: 'Invalid appointments data provided.' });
    }

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

    // SQL query to delete appointments
    const query = `
        DELETE FROM appointment 
        WHERE (Appointment_Number, Date, Doctor_NIC) IN (${placeholders})
    `;

    connection.query(query, values, (err, results) => {
        // Log error and send internal server error response
        if (err) {
            console.error('Error deleting appointments:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        // Send success message
        res.status(200).json({ message: 'Appointments deleted successfully' });
    });
};

module.exports = { getDoctors, makeAppointment, getAppointments, updateAppointment, deleteAppointment };
