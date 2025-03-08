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

module.exports = { bookAppointment };