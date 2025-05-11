const db = require("../config/db");

// Add Drug
const addDrug = (req, res) => {
    const {
        name,
        brand,
        genericName,
        dosageForm,
        strength,
        instructions,
        sideEffects
    } = req.body;

    const query = `
        INSERT INTO drugs (
            name, brand, genericName, dosageForm, strength, instructions, sideEffects
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [name, brand, genericName, dosageForm, strength, instructions, sideEffects];

    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.status(201).json({ message: "Drug added successfully", drugId: result.insertId });
    });
};

// Update Drug
const updateDrug = (req, res) => {
    const { drugId } = req.params;
    const {
        name,
        brand,
        genericName,
        dosageForm,
        strength,
        instructions,
        sideEffects,
        isActive
    } = req.body;

    const query = `
        UPDATE drugs
        SET name = ?, brand = ?, genericName = ?, dosageForm = ?, strength = ?, 
            instructions = ?, sideEffects = ?, isActive = ?, updatedAt = NOW()
        WHERE drugId = ?
    `;

    const values = [
        name, brand, genericName, dosageForm, strength,
        instructions, sideEffects, isActive, drugId
    ];

    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.status(200).json({ message: "Drug updated successfully" });
    });
};

// Get Drug by ID
const getDrugById = (req, res) => {
    const { drugId } = req.params;

    if (!drugId) {
        return res.status(400).json({ message: "Drug ID is required" });
    }

    const query = `
        SELECT * FROM drugs
        WHERE drugId = ? AND isActive = 1
    `;

    db.query(query, [drugId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Drug not found" });
        }

        res.status(200).json(result[0]);
    });
};

// Get all Drugs
const getAllDrugs = (req, res) => {
    const query = `
        SELECT * FROM drugs
        -- WHERE isActive = 1
        ORDER BY name ASC
    `;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        res.status(200).json(result);
    });
};


// Delete Drug (soft delete by marking isActive = 0)
const deleteDrug = (req, res) => {
    const { drugId } = req.params;

    const query = `
        UPDATE drugs
        SET isActive = 0, updatedAt = NOW()
        WHERE drugId = ?
    `;

    db.query(query, [drugId], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.status(200).json({ message: "Drug deleted (deactivated) successfully" });
    });
};

module.exports = {
    addDrug,
    updateDrug,
    getDrugById,
    getAllDrugs,
    deleteDrug
};
