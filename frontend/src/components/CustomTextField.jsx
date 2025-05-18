import React from 'react';
import { TextField, Box } from '@mui/material';

function CustomTextField({ label, placeholder, type = 'text', required = false, name, value, onChange, multiline = false, rows = 1, ...props }) {
  return (
    <Box sx={{ margin: 'auto', mt: 2 }}>
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
        name={name}
        value={value}
        onChange={onChange}
        multiline={multiline}
        rows={rows}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: 'white',
            '& fieldset': {
              borderColor: 'grey',
            },
            '&:hover fieldset': {
              borderColor: 'grey',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'grey',
            },
          },
        }}
        {...props}
      />
    </Box>
  );
}

export default CustomTextField;