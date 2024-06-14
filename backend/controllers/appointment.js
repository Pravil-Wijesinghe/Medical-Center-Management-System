const connection = require('../DBConnect');

const getDoctors = (req, res) => {
    const query = 'SELECT NIC, CONCAT(First_Name, " ", Last_Name) AS Name FROM doctor';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching doctors:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json(results);
    });
};

const makeAppointment = (req, res) => {
    const { date, time, diseaseReport, patientNIC, relationship, doctorNIC, forFamilyMembers } = req.body;

    const query = `INSERT INTO appointment (Date, Time, Disease_Report, Patient_NIC, Relationship, Doctor_NIC)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [date, time, diseaseReport, patientNIC, forFamilyMembers ? relationship : null, doctorNIC];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error making appointment:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ message: 'Appointment made successfully', id: result.insertId });
    });
};

const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

const getAppointments = (req, res) => {
    const { date, time } = req.query;
    let query = 'SELECT * FROM appointment';
    const queryParams = [];

    if (date) {
        query += ' WHERE Date = ?';
        queryParams.push(date);
    }
    if (time) {
        query += date ? ' AND Time = ?' : ' WHERE Time = ?';
        queryParams.push(time);
    }

    connection.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error fetching appointments:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        results.forEach(appointment => {
            appointment.Date = formatDate(appointment.Date);
        });
        res.status(200).json(results);
    });
};

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

const deleteAppointment = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM appointment WHERE Appointment_Number = ?`;
    connection.query(query, [id], (err) => {
        if (err) {
            console.error('Error deleting appointment:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    });
};

module.exports = { getDoctors, makeAppointment, getAppointments, updateAppointment, deleteAppointment };
