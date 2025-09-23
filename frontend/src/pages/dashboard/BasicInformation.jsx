import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, Avatar, IconButton, Button, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function BasicInformation() {
  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', address: '', phoneNumber: '', email: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
          <TextField fullWidth label="First Name" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Ex: John" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Ex: John" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="User Name" name="username" value={form.username} onChange={handleChange} placeholder="Ex: John" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Address" name="address" value={form.address} onChange={handleChange} placeholder="Ex: John" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Ex: John" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} placeholder="Ex: John" />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
        <Button variant="outlined" color="success">Cancel</Button>
        <Button variant="contained" color="success">Save</Button>
      </Box>
    </Paper>
  );
}


