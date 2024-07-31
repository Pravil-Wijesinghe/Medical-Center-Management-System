// routes/medicine.js

const express = require('express');
const router = express.Router();
const { getAllMedicines, getMedicineById, updateMedicine, addMedicine } = require('../controllers/medicine');
const { validateMedicine, validateMedicineUpdate } = require('../Validations/validateMedicineUpdate');

// Route to get all medicines
router.get('/', getAllMedicines);
// Route to get a specific medicine by its ID
router.get('/:id', getMedicineById);
// Route to update a specific medicine by its ID
router.put('/:id', validateMedicineUpdate, updateMedicine);
// Route to add a new medicine
router.post('/add', validateMedicine, addMedicine);

module.exports = router;
