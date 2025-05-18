import { useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import backgroundImg from '../assets/sign-up-bg-img.png';
import CustomTextField from '../components/CustomTextField';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

function SignUp() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    address: '',
    phonenummber: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const [errors, setErrors] = useState({
    phonenummber: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^[0-9]{10}$/; // Example: Validates a 10-digit phone number
    return re.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // Example: Validates that the password is at least 8 characters long
    return password.length >= 8;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'phonenummber') {
      if (!validatePhoneNumber(value)) {
        setErrors({ ...errors, phonenummber: 'Please enter a valid phone number.' });
      } else {
        setErrors({ ...errors, phonenummber: '' });
      }
    }

    if (name === 'email') {
      if (!validateEmail(value)) {
        setErrors({ ...errors, email: 'Please enter a valid email address.' });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }

    if (name === 'password') {
      if (!validatePassword(value)) {
        setErrors({ ...errors, password: 'Password must be at least 8 characters long.' });
      } else {
        setErrors({ ...errors, password: '' });
      }
    }

    if (name === 'confirmpassword') {
      if (value !== formData.password) {
        setErrors({ ...errors, confirmpassword: 'Passwords do not match.' });
      } else {
        setErrors({ ...errors, confirmpassword: '' });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePhoneNumber(formData.phonenummber)) {
      setErrors({ ...errors, phonenummber: 'Please enter a valid phone number.' });
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address.' });
      return;
    }
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <Paper sx={{ width: '100%', height: '100vh', position: 'relative', padding: 10, display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          width: '50%',
          height: '100%',
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: 20,
        }}
      />
      <Box
        sx={{
          width: '50%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Typography sx={{ fontSize: 48, fontWeight: 600 }}>Create an Account</Typography>
        <Typography color="grey" sx={{ fontSize: 16, fontWeight: 400, mt: 1 }} align="center">
          Welcome to Med Connect! We are excited to introduce our state-of-the-art Medical Center Management System, designed to streamline your healthcare experience.
          Whether you are a patient seeking efficient appointment scheduling or a healthcare professional aiming to enhance your practice, our system is here to meet your
          needs.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              my: 3,
            }}
          >
            <Grid size={6}>
              <CustomTextField
                label="Your Name"
                placeholder="Ex: John"
                required={true}
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={6}>
              <CustomTextField
                label="Last Name"
                placeholder="Ex: Doe"
                required={true}
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={6}>
              <CustomTextField
                label="Username"
                placeholder="Ex: JohnDoe1"
                required={true}
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={6}>
              <CustomTextField
                label="Address"
                placeholder="Ex: 221/A, 2nd Floor, ABC Street, XYZ City"
                required={true}
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={6}>
              <CustomTextField
                label="Phone Number"
                type="tel"
                placeholder="Ex: 0123456789"
                required={true}
                name="phonenummber"
                value={formData.phonenummber}
                onChange={handleChange}
                error={!!errors.phonenummber}
                helperText={errors.phonenummber}
              />
            </Grid>
            <Grid size={6}>
              <CustomTextField
                label="Email"
                placeholder="Ex: user@example.com"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid size={6}>
              <CustomTextField
                label="Password"
                type="password"
                placeholder="**********"
                required={true}
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid size={6}>
              <CustomTextField
                label="Confirm Password"
                placeholder="**********"
                type="password"
                required={true}
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                error={!!errors.confirmpassword}
                helperText={errors.confirmpassword}
              />
            </Grid>
            <Grid size={6}>
              <SecondaryButton fullWidth href="/">Back to Home</SecondaryButton>
            </Grid>
            <Grid size={6}>
              <PrimaryButton fullWidth type="submit">Create an Account</PrimaryButton>
            </Grid>
          </Grid>
        </form>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            mt: 0,
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 400 }} align="center">
            Already have an account?
          </Typography>
          <Button variant="text" sx={{ textTransform: 'none' }}>Login</Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default SignUp;