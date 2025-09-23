import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Grid } from '@mui/material';

export default function Appointments() {
  const [open, setOpen] = useState(false);

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>Appointments</Typography>
        <Button variant="contained" color="success" onClick={() => setOpen(true)}>Make an Appointment</Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1,2,3,4,5].map((i) => (
            <TableRow key={i} hover>
              <TableCell>A00{i}</TableCell>
              <TableCell>Suresh Perera</TableCell>
              <TableCell>2023-12-21</TableCell>
              <TableCell>02.30</TableCell>
              <TableCell>{i % 2 === 0 ? 'Inactive' : 'Active'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Make an appointment</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Date" type="date" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Time" type="time" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth label="Select Doctor" defaultValue="">
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="1">Dr. Suresh Perera</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined" color="success">Cancel</Button>
          <Button variant="contained" color="success">Make an Appointment</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}


