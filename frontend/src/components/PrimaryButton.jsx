import React from 'react';
import { Button } from '@mui/material';

function PrimaryButton({ children, ...props }) {
  return (
    <Button
      variant="contained"
      sx={{
        textTransform: 'none',
        borderRadius: 20,
        px: 4,
        my: 4,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;