
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Paper, Box, Typography, Grid, Button, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import backgroundImg from '../assets/login-bg-img.png';
import CustomTextField from '../components/CustomTextField';
import PrimaryButton from '../components/PrimaryButton';
import { loginUser, clearError } from '../store/slices/authSlice';  

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({});

    // Clear error when component mounts
    React.useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated) {
        navigate('/dashboard'); // Change this to your desired route after login
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));

        // Clear field error when user starts typing
        if (formErrors[name]) {
        setFormErrors(prev => ({
            ...prev,
            [name]: ''
        }));
        }
    };

    const showToast = (icon, title) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
    
        Toast.fire({
          icon: icon,
          title: title
        });
      };

    const validateForm = () => {
        const errors = {};

        if (!formData.username.trim()) {
        errors.username = 'Username is required';
        }

        if (!formData.password) {
        errors.password = 'Password is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
        return;
        }

        try {
        const result = await dispatch(loginUser(formData)).unwrap();
        showToast('success', result.message || 'Login successful!');
        navigate('/dashboard'); // Redirect to dashboard on successful login
        } catch (error) {
        showToast('error', error); 
        // Error will be displayed via the error state from Redux
        }
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
        <Typography sx={{ fontSize: 48, fontWeight: 600 }}>Welcome Back</Typography>
        <Typography color="grey" sx={{ fontSize: 16, fontWeight: 400, mt: 1 }} align="center">
            Please enter your credentials to log in to your account.
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
                <Grid size={12}>
                    <CustomTextField
                        label="Username"
                        placeholder="Ex: JohnDoe1"
                        required={true}
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={!!formErrors.username}
                        helperText={formErrors.username}
                        disabled={isLoading}
                    />
                </Grid>
                <Grid size={12}>
                    <CustomTextField
                        label="Password"
                        type="password"
                        placeholder="**********"
                        required={true}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                        disabled={isLoading}
                    />
                </Grid>
                <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <PrimaryButton
                        type="submit"
                        fullWidth
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </PrimaryButton>
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
                Don't have an account?
            </Typography>
            <Button href="/signup" variant="text" sx={{ textTransform: 'none' }}>create an Account</Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default Login
