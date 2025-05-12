const db = require("../config/db");

const createMedicalRecord = (req, res) => {
    const { appointmentId, doctorId, patientId, diagnosis, treatmentPlan, prescribedDrugs } = req.body;

    if (!appointmentId || !doctorId || !patientId || !diagnosis || !treatmentPlan) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const recordQuery = `
        INSERT INTO medical_records (appointmentId, doctorId, patientId, diagnosis, treatmentPlan)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(recordQuery, [appointmentId, doctorId, patientId, diagnosis, treatmentPlan], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        const recordId = result.insertId;

        // Insert prescribed drugs
        if (prescribedDrugs && prescribedDrugs.length > 0) {
            const drugValues = prescribedDrugs.map(drug => [recordId, drug.drugId, drug.dosage, drug.frequency, drug.duration, drug.instructions]);
            const drugQuery = `
                INSERT INTO medical_record_drugs (recordId, drugId, dosage, frequency, duration, instructions)
                VALUES ?
            `;

            db.query(drugQuery, [drugValues], (err2) => {
                if (err2) {
                    return res.status(500).json({ message: "Error saving prescribed drugs", error: err2 });
                }
                res.status(201).json({ message: "Medical record and prescriptions saved successfully" });
            });
        } else {
            res.status(201).json({ message: "Medical record saved (no drugs prescribed)" });
        }
    });
};

const getMedicalRecordById = (req, res) => {
    const { recordId } = req.params;

    const query = `
        SELECT mr.*, 
               d.firstName AS doctorFirstName, d.lastName AS doctorLastName,
               p.firstName AS patientFirstName, p.lastName AS patientLastName
        FROM medical_records mr
        JOIN doctor d ON mr.doctorId = d.doctorId
        JOIN patient p ON mr.patientId = p.patientId
        WHERE mr.recordId = ?
    `;

    db.query(query, [recordId], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        if (results.length === 0) return res.status(404).json({ message: "Record not found" });

        const record = results[0];

        const drugsQuery = `
            SELECT mrd.*, d.name AS drugName, d.brand
            FROM medical_record_drugs mrd
            JOIN drugs d ON mrd.drugId = d.drugId
            WHERE mrd.recordId = ?
        `;

        db.query(drugsQuery, [recordId], (err2, drugs) => {
            if (err2) return res.status(500).json({ message: "Error loading drugs", error: err2 });

            res.status(200).json({ ...record, prescribedDrugs: drugs });
        });
    });
};

const searchMedicalRecords = (req, res) => {
    const { recordId, patientId, doctorId, createdAt, appointmentId } = req.body;

    let whereClause = "WHERE 1=1";
    const params = [];

    if (recordId) {
        whereClause += " AND recordId = ?";
        params.push(recordId);
    }

    if (patientId) {
        whereClause += " AND patientId = ?";
        params.push(patientId);
    }

    if (doctorId) {
        whereClause += " AND doctorId = ?";
        params.push(doctorId);
    }

    if (createdAt) {
        whereClause += " AND DATE(createdAt) = ?";
        params.push(createdAt);
    }

    if (appointmentId) {
        whereClause += " AND appointmentId = ?";
        params.push(appointmentId);
    }

    const query = `
        SELECT * FROM medical_records
        ${whereClause}
        ORDER BY createdAt DESC
    `;

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.status(200).json(results);
    });
};

const updateMedicalRecord = (req, res) => {
    const { recordId } = req.params;
    const { diagnosis, treatmentPlan, prescribedDrugs } = req.body;

    if (!diagnosis && !treatmentPlan && !prescribedDrugs) {
        return res.status(400).json({ message: "Nothing to update" });
    }

    const updateFields = [];
    const params = [];

    if (diagnosis) {
        updateFields.push("diagnosis = ?");
        params.push(diagnosis);
    }

    if (treatmentPlan) {
        updateFields.push("treatmentPlan = ?");
        params.push(treatmentPlan);
    }

    params.push(recordId);

    const updateQuery = `
        UPDATE medical_records
        SET ${updateFields.join(", ")}
        WHERE recordId = ?
    `;

    db.query(updateQuery, params, (err) => {
        if (err) return res.status(500).json({ message: "Error updating record", error: err });

        if (prescribedDrugs && prescribedDrugs.length > 0) {
            const deleteQuery = `DELETE FROM medical_record_drugs WHERE recordId = ?`;
            db.query(deleteQuery, [recordId], (err2) => {
                if (err2) return res.status(500).json({ message: "Failed to clear old drugs", error: err2 });

                const drugValues = prescribedDrugs.map(d => [recordId, d.drugId, d.dosage, d.frequency, d.duration, d.instructions]);
                const insertQuery = `
                    INSERT INTO medical_record_drugs (recordId, drugId, dosage, frequency, duration, instructions)
                    VALUES ?
                `;

                db.query(insertQuery, [drugValues], (err3) => {
                    if (err3) return res.status(500).json({ message: "Failed to insert new drugs", error: err3 });
                    res.status(200).json({ message: "Record and drugs updated" });
                });
            });
        } else {
            res.status(200).json({ message: "Medical record updated" });
        }
    });
};

module.exports = {
    createMedicalRecord,
    getMedicalRecordById,
    searchMedicalRecords,
    updateMedicalRecord
};
