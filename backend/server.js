const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const appointmentRoutes = require('./routes/appointment');
const dbConnect = require('./DBConnect');

app.use(bodyParser.json());

// Add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/signup', signupRoute);
app.use('/login', loginRoute);
// Use appointment routes
app.use('/appointment', appointmentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
