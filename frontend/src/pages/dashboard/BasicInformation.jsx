import React, { useState } from 'react';
import { Box, Grid, Typography, Avatar, IconButton, Button, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CustomTextField from '../../components/CustomTextField';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';

export default function BasicInformation() {
  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', address: '', phoneNumber: '', email: '' });
  const [errors, setErrors] = useState({});

  const validators = {
    firstName: (v) => {
      if (!v) return 'First name is required';
      if (v.trim().length < 2) return 'First name must be at least 2 characters';
      return '';
    },
    lastName: (v) => {
      if (!v) return 'Last name is required';
      if (v.trim().length < 2) return 'Last name must be at least 2 characters';
      return '';
    },
    username: (v) => {
      if (!v) return 'Username is required';
      if (!/^[a-zA-Z0-9._-]{3,20}$/.test(v)) return '3-20 chars; letters, numbers, . _ - only';
      return '';
    },
    address: (v) => {
      if (!v) return 'Address is required';
      if (v.trim().length < 5) return 'Address must be at least 5 characters';
      return '';
    },
    phoneNumber: (v) => {
      if (!v) return 'Phone number is required';
      if (!/^\d{10,15}$/.test(v.replace(/\D/g, ''))) return 'Enter 10-15 digits';
      return '';
    },
    email: (v) => {
      if (!v) return 'Email is required';
      // Basic RFC 5322-compliant-ish pattern
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter a valid email address';
      return '';
    },
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const message = validators[name] ? validators[name](value) : '';
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const validateForm = () => {
    const nextErrors = Object.keys(validators).reduce((acc, key) => {
      const message = validators[key](form[key]);
      if (message) acc[key] = message;
      return acc;
    }, {});
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    // Submit logic goes here (API call)
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>Basic Information</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar sx={{ width: 160, height: 160, bgcolor: '#d9d9d9' }} />
          <IconButton size="small" color="success" sx={{ position: 'absolute', right: 6, bottom: 6, bgcolor: 'background.paper', border: '1px solid', borderColor: 'success.main' }}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomTextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} onBlur={handleBlur} required placeholder="Ex: John" error={!!errors.firstName} helperText={errors.firstName} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} onBlur={handleBlur} required placeholder="Ex: John" error={!!errors.lastName} helperText={errors.lastName} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField label="User Name" name="username" value={form.username} onChange={handleChange} onBlur={handleBlur} required placeholder="Ex: John" error={!!errors.username} helperText={errors.username} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField label="Address" name="address" value={form.address} onChange={handleChange} onBlur={handleBlur} required placeholder="Ex: John" error={!!errors.address} helperText={errors.address} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} onBlur={handleBlur} required placeholder="Ex: John" type="tel" error={!!errors.phoneNumber} helperText={errors.phoneNumber} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField label="Email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} required placeholder="Ex: John" error={!!errors.email} helperText={errors.email} />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
        <SecondaryButton>
          Cancel
        </SecondaryButton>
        <PrimaryButton onClick={handleSubmit}>
          Save
        </PrimaryButton>
      </Box>
    </Paper>
  );
}


