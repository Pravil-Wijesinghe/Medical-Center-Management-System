// frontend/src/Validation/LoginValidation.js
const validateLogin = (values) => {
    let errors = {};

    if (!values.nic) {
        errors.nic = 'NIC Number is required.';
    }

    if (!values.password) {
        errors.password = 'Password is required.';
    }

    return errors;
};

export default validateLogin;
