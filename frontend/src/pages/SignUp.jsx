import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import backgroundImg from '../assets/sign-up-bg-img.png';
import React from 'react'
import CustomTextField from '../components/CustomTextField';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

function SignUp() {
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
            <Typography sx={{ fontSize: 48, fontWeight: 600, }}>Create an Account</Typography>
            <Typography color='grey' sx={{ fontSize: 16, fontWeight: 400, mt: 1 }} align="center">
                Welcome to Med Connect! We are excited to introduce our state-of-the-art Medical Center Management System, designed to streamline your healthcare experience.
                Whether you are a patient seeking efficient appointment scheduling or a healthcare professional aiming to enhance your practice, our system is here to meet your
                needs.
            </Typography>
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
                    />
                </Grid>
                <Grid size={6}>
                    <CustomTextField
                        label="Last Name"
                        placeholder="Ex: Doe"
                        required={true}
                        name="lastname"
                    />
                </Grid>
                <Grid size={6}>
                    <CustomTextField
                        label="Username"
                        placeholder="Ex: JohnDoe1"
                        required={true}
                        name="username"
                    />
                </Grid>
                <Grid size={6}>
                    <CustomTextField
                        label="Address"
                        placeholder="Ex: 221/A, 2nd Floor, ABC Street, XYZ City"
                        required={true}
                        name="address"
                    />
                </Grid>
                <Grid size={6}>
                    <CustomTextField
                        label="Phone Number"
                        type="tel"
                        placeholder="Ex: 0123456789"
                        required={true}
                        name="phonenummber"
                    />
                </Grid>
                <Grid size={6}>
                    <CustomTextField
                        label="Email"
                        placeholder="Ex: user@example.com"
                        type='email'
                        name="email"
                    />
                </Grid>
                <Grid size={6}>
                    <CustomTextField
                        label="Password"
                        type="password"
                        placeholder="**********"
                        required={true}
                        name="password"
                    />
                </Grid>
                <Grid size={6}>
                    <CustomTextField
                        label="Confirm Password"
                        placeholder="**********"
                        type='password'
                        required={true}
                        name="confirmpassword"
                    />
                </Grid>
                <Grid size={6}>
                    <SecondaryButton fullWidth href="/ ">Back to Home</SecondaryButton>
                </Grid>
                <Grid size={6}>
                    <PrimaryButton fullWidth>Create an Account</PrimaryButton>
                </Grid>
            </Grid>
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
                <Typography sx={{ fontSize: 16, fontWeight: 400, }} align="center">
                    Already have an account?
                </Typography>
                <Button variant='text' sx={{textTransform: 'none',}}>Login</Button>
            </Box>
        </Box>
    </Paper>
  )
}

export default SignUp
