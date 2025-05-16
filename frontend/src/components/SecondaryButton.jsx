import React from 'react';
import { Button } from '@mui/material';

function SecondaryButton({ children, ...props }) {
  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: 'green',
        color: 'green',
        borderRadius: '20px',
        padding: '10px 20px',
        '&:hover': {
          borderColor: '#00695c',
          backgroundColor: 'rgba(0, 105, 92, 0.04)',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default SecondaryButton;
