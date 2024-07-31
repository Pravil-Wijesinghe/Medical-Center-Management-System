// Function to validate login data
const validateLoginData = (data) => {
    const { nic, password } = data;

    // Check if NIC is provided
    if (!nic) {
        return { valid: false, message: 'NIC Number is required.' };
    }

    // Check if password is provided
    if (!password) {
        return { valid: false, message: 'Password is required.' };
    }

    return { valid: true, message: '' };
};

module.exports = validateLoginData;
