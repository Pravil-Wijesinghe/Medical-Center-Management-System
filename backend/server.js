const express = require('express');
const bodyParser = require('body-parser');
const signupRoute = require('./routes/signup');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/signup', signupRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
