import React, { useState } from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

export default function MedicalHistory() {
  const [open, setOpen] = useState(false);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>Medical History</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Diagnosis</TableCell>
            <TableCell>Treatment Plan</TableCell>
            <TableCell>Prescribed Drugs</TableCell>
            <TableCell>Action</TableCell>
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
              <TableCell>
                <IconButton color="default" onClick={() => setOpen(true)}><VisibilityIcon /></IconButton>
                <IconButton color="default"><DownloadIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Appointment A004</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'grid', gridTemplateColumns: '160px 1fr', rowGap: 1.5 }}>
            <strong>Date:</strong><span>2025-10-04</span>
            <strong>Doctor:</strong><span>Dr. Suresh Perera</span>
            <strong>Diagnosis:</strong><span>Details about diagnosis...</span>
            <strong>Treatment Plan:</strong><span>Details about treatment plan...</span>
            <strong>Prescribed Drugs:</strong><span>Prescription details...</span>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success">Download</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}


