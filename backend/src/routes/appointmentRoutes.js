const express = require("express");
const { bookAppointment, getAppointmentsForDoctor, confirmAppointment, cancelAppointment, getAppointmentsForPatient, getAppointments } = require("../controllers/appointmentController");
const router = express.Router();

router.post("/book", bookAppointment);
router.post("/list-doctor", getAppointmentsForDoctor);
router.post("/confirm", confirmAppointment);
router.post("/cancel", cancelAppointment);
router.post("/list-patient", getAppointmentsForPatient);
router.post("/all", getAppointments);

module.exports = router;
