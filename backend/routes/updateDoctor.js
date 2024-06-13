// backend/routes/updateDoctor.js

const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');
const validateDoctorData = require('../Validations/validateDoctor');

router.put('/:nic', (req, res) => {
    const { nic } = req.params;
    const { First_Name, Last_Name, Specialization, Mobile_Number, Email, Address, Password, Doctor_Fee, Room } = req.body;

    const validation = validateDoctorData({ NIC: nic, First_Name, Last_Name, Specialization, Mobile_Number, Email, Address, Password, Doctor_Fee, Room });
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }

    const query = `
        UPDATE doctor 
        SET First_Name = ?, Last_Name = ?, Specialization = ?, Mobile_Number = ?, Email = ?, Address = ?, Password = ?, Doctor_Fee = ?, Room = ?
        WHERE NIC = ?
    `;
    const values = [First_Name, Last_Name, Specialization, Mobile_Number, Email, Address, Password, Doctor_Fee, Room, nic];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error updating doctor:', error.sqlMessage || error.message);
            return res.status(500).json({ message: 'Server error', error: error.sqlMessage || error.message });
        }
        res.status(200).json({ message: 'Doctor updated successfully' });
    });
});

module.exports = router;
