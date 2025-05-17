import { Box, Typography } from '@mui/material'
import React from 'react'

function Ads() {
  return (
    <Box
        sx={{
            mx: 28,
            backgroundColor: 'primary.main',
            height: 200,
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            my: 10,
        }}
    >
     <Typography variant="h2" color='white' sx={{ fontWeight: 'bold', color: 'white' }}>
        Lorem ipsum dolor sit amet, consectetur. 
      </Typography>
    </Box>
  )
}

export default Ads
