import React from 'react';
import { TextField, Box } from '@mui/material';

function CustomTextField({ label, placeholder, type = 'text', required = false, ...props }) {
  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box component="span" sx={{ color: 'green', mr: 1 }}>
          {label} {required && <Box component="span" sx={{ color: 'red' }}>*</Box>}
        </Box>
      </Box>
      <TextField
        fullWidth
        placeholder={placeholder}
        variant="outlined"
        type={type}
        required={required}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            backgroundColor: '#f5f5f5',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },
          },
        }}
        {...props}
      />
    </Box>
  );
}

export default CustomTextField;