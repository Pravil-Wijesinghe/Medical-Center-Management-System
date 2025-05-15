import { Box, Typography, Button } from '@mui/material';
import backgroundImg from '../../assets/bg-img-1.png';

function Hero() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh', // Adjust height as needed
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        px: 28
      }}
    >
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                width: '50%',
            }}
        >
            <Typography sx={{ fontSize: 84, fontWeight: 300, mb: [-4] }}>Welcome to</Typography>
            <Typography sx={{ fontSize: 84, fontWeight: 700, mb: 2 }}>Med Connect</Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 400, }} align="justify">
                Welcome to Med Connect! We are excited to introduce our state-of-the-art Medical Center Management System, designed to streamline your healthcare experience. 
                Whether you are a patient seeking efficient appointment scheduling or a healthcare professional aiming to enhance your practice, our system is here to meet your 
                needs.
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, mt: 4 }}>
                <Button
                    variant='contained'
                    sx={{
                        textTransform: 'none',
                        borderRadius: 20,
                        px: 4
                    }}
                >
                    Make an appointment
                </Button>
                <Button
                    variant='outlined'
                    sx={{
                        textTransform: 'none',
                        borderRadius: 20,
                        px: 4
                    }}
                >
                    Meet Doctor
                </Button>
            </Box>
        </Box>
    </Box>
  );
}

export default Hero;