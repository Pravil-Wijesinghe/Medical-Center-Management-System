const validateAppointmentData = ({ date, time, diseaseReport, patientNIC, relationship, doctorNIC }) => {
    if (!date) {
        return { valid: false, message: 'Date is required' };
    }
    if (!time) {
        return { valid: false, message: 'Time is required' };
    }
    if (!patientNIC) {
        return { valid: false, message: 'Patient NIC is required' };
    }
    if (!doctorNIC) {
        return { valid: false, message: 'Doctor NIC is required' };
    }

    // You can add more specific validations here if needed

    return { valid: true, message: '' };
};

module.exports = validateAppointmentData;
