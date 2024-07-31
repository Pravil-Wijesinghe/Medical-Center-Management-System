const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const appointmentRoutes = require('./routes/appointment');
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const patientRoutes = require('./routes/patient');
const doctorRoutes = require('./routes/doctor');
const familyMemberRoutes = require('./routes/familyMember');
const receptionistRoutes = require('./routes/receptionist');
const dashboardRoutes = require('./routes/dashboard');
const availabilityRoutes = require('./routes/availability');
const doctorAvailabilityRoutes = require('./routes/doctorAvailability');
const medicineRoutes = require('./routes/medicine');
const addDoctorRoute = require('./routes/addDoctor');

const getDoctorsRoute = require('./routes/getDoctors');
const updateDoctorRoute = require('./routes/updateDoctor');
const deleteDoctorRoute = require('./routes/deleteDoctor');
const addPaymentRoute = require('./routes/addPayment');

const paymentRoute = require('./routes/payment');

app.use(cors());
app.use(bodyParser.json());

app.use('/appointment', appointmentRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/patient', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/familyMember', familyMemberRoutes);
app.use('/receptionist', receptionistRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/availability', availabilityRoutes);
app.use('/doctorAvailability', doctorAvailabilityRoutes);
app.use('/medicine', medicineRoutes);
app.use('/addDoctor', addDoctorRoute);

app.use('/getDoctors', getDoctorsRoute);
app.use('/updateDoctor', updateDoctorRoute);
app.use('/deleteDoctor', deleteDoctorRoute);
app.use('/addPayment', addPaymentRoute);

app.use('/api', paymentRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
