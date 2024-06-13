// Validations/validateMedicineUpdate.js

const { body, validationResult } = require('express-validator');

const validateMedicine = [
    body('name').notEmpty().withMessage('Medicine name is required'),
    body('supplying_price').isNumeric().withMessage('Supplying price must be a number'),
    body('selling_price').isNumeric().withMessage('Selling price must be a number'),
    body('exp_date').isDate().withMessage('Expiration date is required and must be a valid date'),
    body('quantity').isInt().withMessage('Quantity must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateMedicineUpdate = [
    body('name').notEmpty().withMessage('Medicine name is required'),
    body('supplying_price').isNumeric().withMessage('Supplying price must be a number'),
    body('selling_price').isNumeric().withMessage('Selling price must be a number'),
    body('exp_date').isDate().withMessage('Expiration date is required and must be a valid date'),
    body('quantity').isInt().withMessage('Quantity must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateMedicine, validateMedicineUpdate };
