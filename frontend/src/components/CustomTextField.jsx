import { useState } from 'react';
import { TextField, Box, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function CustomTextField({ label, placeholder, type = 'text', required = false, name, value, onChange, multiline = false, rows = 1, ...props }) {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleKeyDown = (e) => {
    if (type === 'tel' && !/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
      e.preventDefault();
    }
  };

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
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        required={required}
        name={name}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={onChange}
        multiline={multiline}
        rows={rows}
        InputProps={{
          endAdornment: type === 'password' && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
            // Adjust the height of the input field
            '& input': {
              padding: '10px 14px', // Adjust padding to change height
            },
            '& textarea': {
              padding: '12px 14px', // Adjust padding to change height for multiline
            },
          },
        }}
        {...props}
      />
    </Box>
  );
}

export default CustomTextField;