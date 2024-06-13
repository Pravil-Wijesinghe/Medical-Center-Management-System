const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const appointmentRoute = require('./routes/appointment');
const familyMemberRoute = require('./routes/familyMember');

app.use(cors());
app.use(bodyParser.json());

app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/appointment', appointmentRoute);
app.use('/familyMember', familyMemberRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
