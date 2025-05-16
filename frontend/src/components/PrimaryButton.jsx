import React from 'react';
import { Button } from '@mui/material';

function PrimaryButton({ children, ...props }) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: 'green',
        color: 'white',
        borderRadius: '20px',
        padding: '10px 20px',
        '&:hover': {
          backgroundColor: '#00695c',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;