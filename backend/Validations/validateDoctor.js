// Import the validator library
const validator = require('validator');

// Function to validate doctor data
const validateDoctorData = (data) => {
    // Destructure the data object
    const { NIC, First_Name, Last_Name, Specialization, Mobile_Number, Email, Address, Password, Doctor_Fee, Room } = data;
    let message = '';

    // Check if NIC is provided
    if (!NIC) message = 'NIC is required.';
    // Check if the first name is provided
    else if (!First_Name) message = 'First Name is required.';
    // Check if a password is provided
    else if (!Password) message = 'Password is required.';
    // Check if doctor fee is provided
    else if (!Doctor_Fee) message = 'Doctor Fee is required.';
    // Check if the room number is provided
    else if (!Room) message = 'Room is required.';

    return { valid: !message, message };
};

module.exports = validateDoctorData;
