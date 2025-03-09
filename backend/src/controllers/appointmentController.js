const db = require("../config/db");

const bookAppointment = (req, res) => {
    const { patientId, doctorId, date, timeSlot, roomId } = req.body;

    if (!patientId || !doctorId || !date || !timeSlot || !roomId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const timeSlots = {
        Morning: 30,
        Afternoon: 100,
        Evening: 60
    };

    const maxAppointmentsForTime = timeSlots[timeSlot] || 0;
    if (maxAppointmentsForTime === 0) {
        return res.status(400).json({ message: "Invalid time slot" });
    }

    // Step 1: Check doctor availability for the selected time slot
    const checkAvailabilitySql = `
        SELECT availabilityId FROM doctor_availability
        WHERE doctorId = ? AND startDate <= ? AND endDate >= ? AND availableTime = ?
    `;

    db.query(checkAvailabilitySql, [doctorId, date, date, timeSlot], (err, availabilityResults) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (availabilityResults.length === 0) {
            return res.status(404).json({ message: "No available slots found" });
        }

        const availabilityId = availabilityResults[0].availabilityId;

        // Step 2: Generate Appointment Number for the given doctor, date, and time slot
        const countAppointmentsSql = `
            SELECT COUNT(*) AS appointmentCount FROM appointment
            WHERE doctorId = ? AND date = ? AND timeSlot = ?
        `;

        db.query(countAppointmentsSql, [doctorId, date, timeSlot], (err, countResults) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }

            let appointmentNumber = countResults[0].appointmentCount + 1;
            if (appointmentNumber > maxAppointmentsForTime) {
                return res.status(400).json({ message: "No more slots available for this time" });
            }

            // Step 3: Create the appointment (without `time` column)
            const insertAppointmentSql = `
                INSERT INTO appointment (patientId, doctorId, availabilityId, roomId, date, timeSlot, status, appointmentNumber)
                VALUES (?, ?, ?, ?, ?, ?, 'Pending', ?)
            `;

            db.query(insertAppointmentSql, [patientId, doctorId, availabilityId, roomId, date, timeSlot, appointmentNumber], (err, appointmentResult) => {
                if (err) {
                    return res.status(500).json({ message: "Database error", error: err });
                }

                // Return success response
                res.status(201).json({
                    message: "Appointment booked successfully",
                    appointmentId: appointmentResult.insertId,
                    appointmentNumber
                });
            });
        });
    });
};

const getAppointmentsForDoctor = (req, res) => {
    const { doctorId, page = 1, limit = 10 } = req.body; // Default page 1, limit 10

    if (!doctorId) {
        return res.status(400).json({ message: "Doctor ID is required" });
    }

    const offset = (page - 1) * limit;

    // Step 1: Fetch paginated appointments for the given doctor
    const sql = `
        SELECT a.appointmentId, a.patientId, p.firstName AS patientFirstName, p.lastName AS patientLastName, 
               a.date, a.timeSlot, a.status, a.appointmentNumber, r.roomNumber
        FROM appointment a
        JOIN patient p ON a.patientId = p.patientId
        LEFT JOIN rooms r ON a.roomId = r.roomId
        WHERE a.doctorId = ?
        ORDER BY a.date DESC, a.timeSlot ASC, a.appointmentNumber ASC
        LIMIT ? OFFSET ?
    `;

    db.query(sql, [doctorId, parseInt(limit), parseInt(offset)], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        // Step 2: Get total count of appointments for pagination
        const countSql = `SELECT COUNT(*) AS total FROM appointment WHERE doctorId = ?`;

        db.query(countSql, [doctorId], (err, countResults) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }

            const totalAppointments = countResults[0].total;
            const totalPages = Math.ceil(totalAppointments / limit);

            res.json({
                appointments: results,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: totalPages,
                    totalAppointments: totalAppointments
                }
            });
        });
    });
};

const confirmAppointment = (req, res) => {
    const { appointmentId } = req.body;

    if (!appointmentId) {
        return res.status(400).json({ message: "Appointment ID is required" });
    }

    const sql = `
        UPDATE appointment 
        SET status = 'Confirmed'
        WHERE appointmentId = ?
    `;

    db.query(sql, [appointmentId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: "Appointment confirmed successfully" });
    });
};

const cancelAppointment = (req, res) => {
    const { appointmentId } = req.body;

    if (!appointmentId) {
        return res.status(400).json({ message: "Appointment ID is required" });
    }

    const sql = `
        UPDATE appointment 
        SET status = 'Cancelled'
        WHERE appointmentId = ?
    `;

    db.query(sql, [appointmentId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: "Appointment cancelled successfully" });
    });
};

const getAppointmentsForPatient = (req, res) => {
    const { patientId, page = 1, limit = 10 } = req.body;
    const offset = (page - 1) * limit;

    if (!patientId) {
        return res.status(400).json({ message: "Patient ID is required" });
    }

    // SQL query to get appointments for a patient with pagination
    const sql = `
        SELECT 
            appointmentId, doctorId, date, timeSlot, status, appointmentNumber 
        FROM appointment
        WHERE patientId = ?
        LIMIT ? OFFSET ?
    `;

    db.query(sql, [patientId, limit, offset], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        // Get total count of appointments for pagination
        const countSql = `
            SELECT COUNT(*) AS totalAppointments
            FROM appointment
            WHERE patientId = ?
        `;

        db.query(countSql, [patientId], (err, countResults) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }

            const totalAppointments = countResults[0].totalAppointments;
            const totalPages = Math.ceil(totalAppointments / limit);

            // Return the appointments and pagination info
            res.status(200).json({
                appointments: results,
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalAppointments: totalAppointments
                }
            });
        });
    });
};

const getAppointments = (req, res) => {
    const {
        doctorName,
        patientName,
        appointmentDate,
        timeSlot,
        status,
        roomNumber,
        appointmentNumber,
        page = 1,
        limit = 10
    } = req.body;  // Now getting parameters from request body instead of query string

    const offset = (page - 1) * limit;

    // Ensure limit and offset are integers
    const intLimit = parseInt(limit, 10);
    const intOffset = parseInt(offset, 10);

    // Start building the SQL query
    let sql = `
        SELECT a.appointmentId, a.patientId, a.doctorId, a.availabilityId, a.roomId, a.date, a.timeSlot, a.status, a.appointmentNumber,
               r.roomNumber, p.firstName AS patientFirstName, p.lastName AS patientLastName,
               d.firstName AS doctorFirstName, d.lastName AS doctorLastName
        FROM appointment a
        JOIN rooms r ON a.roomId = r.roomId
        JOIN patient p ON a.patientId = p.patientId
        JOIN doctor d ON a.doctorId = d.doctorId
        WHERE 1 = 1
    `;

    const params = [];

    // Dynamically build the WHERE conditions based on provided search fields
    if (doctorName) {
        sql += " AND (d.firstName LIKE ? OR d.lastName LIKE ?)";
        params.push(`%${doctorName}%`, `%${doctorName}%`);
    }

    if (patientName) {
        sql += " AND (p.firstName LIKE ? OR p.lastName LIKE ?)";
        params.push(`%${patientName}%`, `%${patientName}%`);
    }

    if (appointmentDate) {
        sql += " AND a.date = ?";
        params.push(appointmentDate);
    }

    if (timeSlot) {
        sql += " AND a.timeSlot = ?";
        params.push(timeSlot);
    }

    if (status) {
        sql += " AND a.status = ?";
        params.push(status);
    }

    if (roomNumber) {
        sql += " AND r.roomNumber = ?";
        params.push(roomNumber);
    }

    if (appointmentNumber) {
        sql += " AND a.appointmentNumber = ?";
        params.push(appointmentNumber);
    }

    // Add pagination
    sql += " LIMIT ? OFFSET ?";
    params.push(intLimit, intOffset);

    // Query the database
    db.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        // Step 2: Get total count of matching records for pagination
        const countSql = `
            SELECT COUNT(*) AS totalAppointments
            FROM appointment a
            JOIN rooms r ON a.roomId = r.roomId
            JOIN patient p ON a.patientId = p.patientId
            JOIN doctor d ON a.doctorId = d.doctorId
            WHERE 1 = 1
        `;

        db.query(countSql, params, (err, countResults) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }

            const totalAppointments = countResults[0].totalAppointments;
            const totalPages = Math.ceil(totalAppointments / intLimit);

            res.status(200).json({
                appointments: results,
                totalAppointments,
                totalPages,
                currentPage: page
            });
        });
    });
};

const getAppointmentDetails = (req, res) => {
    const { appointmentId } = req.query; // Use req.query instead of req.params

    if (!appointmentId) {
        return res.status(400).json({ message: "Appointment ID is required" });
    }

    const query = `
        SELECT 
            a.appointmentId, 
            a.date, 
            a.timeSlot, 
            a.status, 
            a.appointmentNumber,
            p.patientId, 
            p.firstName AS patientFirstName, 
            p.lastName AS patientLastName, 
            p.address AS patientAddress, 
            p.phoneNumber AS patientPhone, 
            p.email AS patientEmail,
            d.doctorId, 
            d.firstName AS doctorFirstName, 
            d.lastName AS doctorLastName, 
            d.specialization AS doctorSpecialization, 
            d.phoneNumber AS doctorPhone, 
            d.email AS doctorEmail,
            r.roomNumber
        FROM appointment a
        JOIN patient p ON a.patientId = p.patientId
        JOIN doctor d ON a.doctorId = d.doctorId
        JOIN rooms r ON a.roomId = r.roomId
        WHERE a.appointmentId = ?;
    `;

    db.query(query, [appointmentId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json(result[0]); // Return appointment details
    });
};

module.exports = { bookAppointment, getAppointmentsForDoctor, confirmAppointment, cancelAppointment, getAppointmentsForPatient, getAppointments, getAppointmentDetails };