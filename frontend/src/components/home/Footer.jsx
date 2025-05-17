import { Box, IconButton, Typography } from '@mui/material';
import { Facebook, Instagram, Twitter, WhatsApp } from '@mui/icons-material';
import logo from '../../assets/logo.png';
import React from 'react'

function Footer() {
  return (
    <Box sx={{ mx: 28, my: 10, px: 4, py: 5, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between',}}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '84%', gap: 4 }}>
            <img src={logo} alt="Med Connect Logo" style={{ height: 72, marginRight: 10 }} />
            <Typography sx={{ fontWeight: 900, fontSize: 48 }}>
                Med Connect
            </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '16%' }}>
            <IconButton aria-label="facebook" fontSize="large" sx={{ color: 'black' }} href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook />
            </IconButton>
            <IconButton aria-label="instagram" sx={{ color: 'black' }} href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram />
            </IconButton>
            <IconButton aria-label="twitter" sx={{ color: 'black' }} href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter />
            </IconButton>
            <IconButton aria-label="twitter" sx={{ color: 'black' }} href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                <WhatsApp/>
            </IconButton>
        </Box>
    </Box>
  )
}

export default Footer
