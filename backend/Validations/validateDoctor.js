// backend/Validations/validateDoctor.js

const validator = require('validator');

const validateDoctorData = (data) => {
    const { NIC, First_Name, Last_Name, Specialization, Mobile_Number, Email, Address, Password, Doctor_Fee, Room } = data;
    let message = '';

    if (!NIC) message = 'NIC is required.';
    else if (!First_Name) message = 'First Name is required.';
    else if (!Password) message = 'Password is required.';
    else if (!Doctor_Fee) message = 'Doctor Fee is required.';
    else if (!Room) message = 'Room is required.';

    return { valid: !message, message };
};

module.exports = validateDoctorData;
