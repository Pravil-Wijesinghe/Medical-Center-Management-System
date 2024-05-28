const validator = require('validator');

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

const validateSignupData = (data) => {
    const { firstName, lastName, nicNumber, mobileNumber, email, dateOfBirth, password } = data;

    if (!isValidName(firstName)) {
        return { valid: false, message: 'First Name must contain only letters.' };
    }

    if (!isValidName(lastName)) {
        return { valid: false, message: 'Last Name must contain only letters.' };
    }

    if (!isValidNIC(nicNumber)) {
        return { valid: false, message: 'NIC Number is invalid.' };
    }

    if (mobileNumber && !isValidMobileNumber(mobileNumber)) {
        return { valid: false, message: 'Mobile Number must be a valid Sri Lankan number.' };
    }

    if (email && !isValidEmail(email)) {
        return { valid: false, message: 'Email is invalid.' };
    }

    if (!isValidDOB(dateOfBirth)) {
        return { valid: false, message: 'You must be at least 18 years old.' };
    }

    if (!isValidPassword(password)) {
        return { valid: false, message: 'Password must be at least 8 characters long and contain both letters and numbers.' };
    }

    return { valid: true };
};

module.exports = validateSignupData;
