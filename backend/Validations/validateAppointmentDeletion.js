// This function validates the data for deleting appointments.
const validateAppointmentDeletion = ({ appointments }) => {

  // Check if the appointments array exists, is an array, and is not empty
    if (!appointments || !Array.isArray(appointments) || appointments.length === 0) {
      return { valid: false, message: 'No appointments provided for deletion.' };
    }
  
    for (const appointment of appointments) {
      // Ensure each appointment has a valid Appointment_Number, Date, and Doctor_NIC
      if (!appointment.Appointment_Number || !appointment.Date || !appointment.Doctor_NIC) {
        return { valid: false, message: 'Invalid appointment data provided for deletion.' };
      }
    }
  
    // If all appointments are valid, return valid: true
    return { valid: true };
  };
  
  module.exports = validateAppointmentDeletion;
  