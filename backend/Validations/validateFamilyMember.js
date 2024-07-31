// Function to validate family member data
const validateFamilyMember = (data) => {
    // Destructure necessary fields from the input data
    const { relationship, firstName, dob, gender } = data;
    const errors = [];

    // Check if the relationship is provided
    if (!relationship) errors.push('Relationship is required.');
    // Check if the first name is provided
    if (!firstName) errors.push('First name is required.');
    // Check if the date of birth is provided
    if (!dob) errors.push('Date of birth is required.');
    // Check if the gender is provided
    if (!gender) errors.push('Gender is required.');

    // If there are any errors, return an object indicating invalid data
    if (errors.length > 0) {
        return { valid: false, message: errors.join(' ') };
    }

    return { valid: true };
};

module.exports = validateFamilyMember;
