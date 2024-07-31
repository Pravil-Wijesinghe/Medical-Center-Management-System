const { body, validationResult } = require('express-validator');

// validating medicine data
const validateMedicine = [
    // Validate that the 'name' field is not empty
    body('name').notEmpty().withMessage('Medicine name is required'),
    // Validate that 'supplying_price' is a numeric value
    body('supplying_price').isNumeric().withMessage('Supplying price must be a number'),
    // Validate that 'selling_price' is a numeric value
    body('selling_price').isNumeric().withMessage('Selling price must be a number'),
    // Validate that 'exp_date' is a valid date
    body('exp_date').isDate().withMessage('Expiration date is required and must be a valid date'),
    // Validate that 'quantity' is an integer
    body('quantity').isInt().withMessage('Quantity must be an integer'),
    (req, res, next) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateMedicine };
