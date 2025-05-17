import { Box, Typography } from '@mui/material'
import React from 'react'

function Ads() {
  return (
    <Box
        sx={{
            mx: 28,
            backgroundColor: 'primary.main',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'left',
            padding: 6,
            my: 10,
            gap: 2,
            borderRadius: 1,
        }}
    >
     <Typography variant="h3" color='white' sx={{ fontWeight: 'bold', color: 'white' }}>
        Stay Healthy with Med Connect! 
      </Typography>
      <Typography variant="subtitle" color='white' sx={{ fontWeight: 'medium', color: 'white' }}>
        Experience seamless healthcare solutions tailored just for you. Whether you're looking for expert medical advice, scheduling appointments, or accessing cutting-edge medical 
        resources, <b>Med Connect</b> is your trusted partner in health.
      </Typography>
      <Typography variant="subtitle" color='white' sx={{ fontWeight: 'medium', color: 'white' }}>
        Join us today and take the first step towards a healthier tomorrow. Your well-being is our priority!
      </Typography>
    </Box>
  )
}

export default Ads
