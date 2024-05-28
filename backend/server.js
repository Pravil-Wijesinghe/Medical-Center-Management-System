const express = require('express');
const bodyParser = require('body-parser');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/signup', signupRoute);
app.use('/login', loginRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
