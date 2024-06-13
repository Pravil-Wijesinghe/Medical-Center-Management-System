// routes/medicine.js

const express = require('express');
const router = express.Router();
const { getAllMedicines, getMedicineById, updateMedicine, addMedicine } = require('../controllers/medicine');
const { validateMedicine, validateMedicineUpdate } = require('../Validations/validateMedicineUpdate');

router.get('/', getAllMedicines);
router.get('/:id', getMedicineById);
router.put('/:id', validateMedicineUpdate, updateMedicine);
router.post('/add', validateMedicine, addMedicine);

module.exports = router;
