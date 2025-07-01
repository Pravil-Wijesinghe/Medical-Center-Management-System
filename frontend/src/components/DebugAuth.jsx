// components/DebugAuth.jsx - Temporary component for debugging
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper } from '@mui/material';

const DebugAuth = () => {
  const authState = useSelector((state) => state.auth);
  
  return (
    <Paper sx={{ p: 2, m: 2, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h6" gutterBottom>Debug Auth State:</Typography>
      <pre style={{ fontSize: '12px', overflow: 'auto' }}>
        {JSON.stringify(authState, null, 2)}
      </pre>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>LocalStorage:</Typography>
      <Typography variant="body2">
        Token: {localStorage.getItem('authToken') ? 'EXISTS' : 'NULL'}
      </Typography>
      <Typography variant="body2">
        User Data: {localStorage.getItem('userData') ? 'EXISTS' : 'NULL'}
      </Typography>
      
      {localStorage.getItem('userData') && (
        <pre style={{ fontSize: '12px', overflow: 'auto', marginTop: '10px' }}>
          {localStorage.getItem('userData')}
        </pre>
      )}
    </Paper>
  );
};

export default DebugAuth;