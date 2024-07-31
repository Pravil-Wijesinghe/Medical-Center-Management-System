const express = require('express');
const router = express.Router();
const connection = require('../DBConnect');
const validateFamilyMember = require('../Validations/validateFamilyMember');

// Route to fetch family members for a specific patient
router.get('/:patientNIC', (req, res) => {
    const patientNIC = req.params.patientNIC;
    const query = 'SELECT * FROM family_member WHERE Patient_NIC = ?';

    connection.query(query, [patientNIC], (err, results) => {
        if (err) {
            console.error('Error fetching family members:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        // Format the date before sending the response
        const formattedResults = results.map(member => ({
            ...member,
            DOB: member.DOB ? member.DOB.toISOString().split('T')[0] : null
        }));
        res.status(200).json(formattedResults);
    });
});

// Add a new family member
router.post('/', (req, res) => {
    const { relationship, firstName, lastName, dob, gender, weight, height, mobileNumber, bloodGroup, patientNic } = req.body;
    
    const validation = validateFamilyMember({ relationship, firstName, dob, gender });
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }

    const query = `
        INSERT INTO family_member (Patient_NIC, First_Name, Last_Name, DOB, Relationship, Blood_Group, Gender, Weight, Height, Mobile_Number)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [patientNic, firstName, lastName, dob, relationship, bloodGroup, gender, weight, height, mobileNumber];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error adding family member:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ message: 'Family member added successfully', member: { Member_ID: results.insertId, ...req.body } });
    });
});

// Delete family members
router.delete('/:patientNIC/:memberID', (req, res) => {
    const { patientNIC, memberID } = req.params;

    const query = 'DELETE FROM family_member WHERE Patient_NIC = ? AND Member_ID = ?';
    const values = [patientNIC, memberID];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error deleting family member:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ message: 'Family member deleted successfully' });
    });
});

module.exports = router;
