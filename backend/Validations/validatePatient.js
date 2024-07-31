// backend/Validations/validatePatient.js
const validator = require('validator');
const bcrypt = require('bcrypt');

// Validate first and last name
const isValidName = (name) => {
    return /^[\p{L}]+$/u.test(name);
};

// Validate NIC number
const isValidNIC = (nic) => {
    if (nic.length === 10) {
        const firstNine = nic.slice(0, 9);
        const lastChar = nic[9];
        return /^\d{9}[vV]$/.test(nic) && !isNaN(firstNine);
    } else if (nic.length === 12) {
        return /^\d{12}$/.test(nic);
    }
    return false;
};

// Validate Sri Lankan mobile number
const isValidMobileNumber = (mobile) => {
    return /^07\d{8}$/.test(mobile);
};

// Validate email
const isValidEmail = (email) => {
    return validator.isEmail(email);
};

// Validate date of birth (must be 18+ years old)
const isValidDOB = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    return age > 18 || (age === 18 && m >= 0 && today.getDate() >= birthDate.getDate());
};

// Validate password (at least 8 characters and contains both numbers and letters)
const isValidPassword = (password) => {
    return password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);
};

// Main function to validate patient data
const validatePatientData = (data) => {
    const { First_Name, Last_Name, NIC, Mobile_Number, Email, DOB, Password } = data;

    if (!isValidName(First_Name)) {
        return { valid: false, message: 'First Name must contain only letters.' };
    }

    if (!isValidName(Last_Name)) {
        return { valid: false, message: 'Last Name must contain only letters.' };
    }

    if (!isValidNIC(NIC)) {
        return { valid: false, message: 'NIC Number is invalid.' };
    }

    if (Mobile_Number && !isValidMobileNumber(Mobile_Number)) {
        return { valid: false, message: 'Mobile Number must be a valid Sri Lankan number.' };
    }

    if (Email && !isValidEmail(Email)) {
        return { valid: false, message: 'Email is invalid.' };
    }

    if (!isValidDOB(DOB)) {
        return { valid: false, message: 'You must be at least 18 years old.' };
    }

    if (!isValidPassword(Password)) {
        return { valid: false, message: 'Password must be at least 8 characters long and contain both letters and numbers.' };
    }

    return { valid: true };
};

module.exports = validatePatientData;
