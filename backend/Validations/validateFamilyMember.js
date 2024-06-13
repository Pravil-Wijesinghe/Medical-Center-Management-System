const validateFamilyMember = (data) => {
    const { relationship, firstName, dob, gender } = data;
    const errors = [];

    if (!relationship) errors.push('Relationship is required.');
    if (!firstName) errors.push('First name is required.');
    if (!dob) errors.push('Date of birth is required.');
    if (!gender) errors.push('Gender is required.');

    if (errors.length > 0) {
        return { valid: false, message: errors.join(' ') };
    }

    return { valid: true };
};

module.exports = validateFamilyMember;
