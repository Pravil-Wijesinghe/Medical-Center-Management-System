const validator = require('validator');

// Validate NIC number and password
const validateLoginData = (data) => {
    const { nic, password } = data;

    if (!nic) {
        return { valid: false, message: 'NIC Number is required.' };
    }

    if (!password) {
        return { valid: false, message: 'Password is required.' };
    }

    return { valid: true };
};

module.exports = validateLoginData;
