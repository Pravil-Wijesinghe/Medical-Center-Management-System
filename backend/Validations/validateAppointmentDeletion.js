const validateAppointmentDeletion = ({ appointments }) => {
    if (!appointments || !Array.isArray(appointments) || appointments.length === 0) {
        return { valid: false, message: 'No appointments provided for deletion.' };
    }

    for (const appointment of appointments) {
        if (!appointment.Appointment_Number || !appointment.Date || !appointment.Doctor_NIC) {
            return { valid: false, message: 'Invalid appointment data provided for deletion.' };
        }
    }

    return { valid: true };
};

module.exports = validateAppointmentDeletion;
