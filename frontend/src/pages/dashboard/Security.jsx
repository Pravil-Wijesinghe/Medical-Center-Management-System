import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, Button, Paper } from '@mui/material';

export default function Security() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>Security</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Current Password" type="password" name="currentPassword" value={form.currentPassword} onChange={handleChange} placeholder="Ex: John" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="New Password" type="password" name="newPassword" value={form.newPassword} onChange={handleChange} placeholder="Ex: John" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Confirm New Password" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Ex: John" />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
        <Button variant="outlined" color="success">Cancel</Button>
        <Button variant="contained" color="success">Save</Button>
      </Box>
    </Paper>
  );
}


