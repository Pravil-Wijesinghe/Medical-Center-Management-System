import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Grid } from '@mui/material';

export default function FamilyMembers() {
  const [open, setOpen] = useState(false);

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>Family Members</Typography>
        <Button variant="contained" color="success" onClick={() => setOpen(true)}>Add Family Member</Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Relationship</TableCell>
            <TableCell>Appointment</TableCell>
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
        <DialogTitle>Add a Family Member</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="First Name" placeholder="Ex: John" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Last Name" placeholder="Ex: John" />
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth label="Relationship" defaultValue="">
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="mother">Mother</MenuItem>
                <MenuItem value="father">Father</MenuItem>
                <MenuItem value="spouse">Spouse</MenuItem>
                <MenuItem value="child">Child</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined" color="success">Cancel</Button>
          <Button variant="contained" color="success">Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}


