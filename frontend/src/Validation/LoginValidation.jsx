function validation(values) {
    let errors = {};
    const nic_pattern = /[0-9]{9}[VvXx] | [0-9]{12}$/;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!values.nic || !values.nic.trim()) {
        errors.nic = 'NIC number is required';
    } else if (!nic_pattern.test(values.nic)) {
        errors.nic = 'Invalid NIC number';
    }
    else{
        errors.nic = '';
    }

    if (!values.password || !values.password.trim()) {
        errors.password = 'Password is required';
    } else if (!password_pattern.test(values.password)) {
        errors.password = 'Invalid password';
    }
    else{
        errors.password = '';
    }

    return errors;
}

export default validation;
