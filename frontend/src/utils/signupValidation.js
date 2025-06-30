// signupValidations.js

// Function to validate phone number
export const validatePhoneNumber = (phoneNumber) => {
  const re = /^[0-9]{10}$/; // Example: Validates a 10-digit phone number
  return re.test(phoneNumber);
};

// Function to validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Function to validate password
export const validatePassword = (password) => {
  // Example: Validates that the password is at least 8 characters long
  return password.length >= 8;
};

// Function to validate the entire form
export const validateForm = (formData) => {
  const newErrors = {};

  // Check required fields
  if (!formData.firstname.trim()) {
    newErrors.firstname = 'First name is required.';
  }
  if (!formData.lastname.trim()) {
    newErrors.lastname = 'Last name is required.';
  }
  if (!formData.username.trim()) {
    newErrors.username = 'Username is required.';
  }
  if (!formData.address.trim()) {
    newErrors.address = 'Address is required.';
  }
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required.';
  }
  if (!formData.password.trim()) {
    newErrors.password = 'Password is required.';
  }
  if (!formData.confirmpassword.trim()) {
    newErrors.confirmpassword = 'Confirm password is required.';
  }

  // Validation checks
  if (formData.phonenummber && !validatePhoneNumber(formData.phonenummber)) {
    newErrors.phonenummber = 'Please enter a valid phone number.';
  }
  if (formData.email && !validateEmail(formData.email)) {
    newErrors.email = 'Please enter a valid email address.';
  }
  if (formData.password && !validatePassword(formData.password)) {
    newErrors.password = 'Password must be at least 8 characters long.';
  }
  if (formData.confirmpassword && formData.password !== formData.confirmpassword) {
    newErrors.confirmpassword = 'Passwords do not match.';
  }

  return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
};
