import React from 'react';
import { Button } from '@mui/material';

function SecondaryButton({ children, ...props }) {
  return (
    <Button
      variant="outlined"
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

export default SecondaryButton;
