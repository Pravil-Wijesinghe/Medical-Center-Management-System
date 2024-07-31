const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const appointmentRoute = require('./routes/appointment');
const familyMemberRoute = require('./routes/familyMember');
const doctorRoute = require('./routes/doctor');

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// API routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/appointment', appointmentRoute);
app.use('/familyMember', familyMemberRoute);
app.use('/doctors', doctorRoute);

// Catch-all route to serve the index.html file for any unknown route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
