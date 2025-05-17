import { Box, Toolbar } from "@mui/material";
import Button from '@mui/material/Button';

const Footer = ({ scrollToHero, scrollToAboutUs, scrollToServices, scrollToContactUs }) => {
  return (
    <Box sx={{ px: 28, py: 0 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <p>© {new Date().getFullYear()} MedConnect. All rights reserved.</p>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={scrollToHero}>Home</Button>
          <Button color="inherit" onClick={scrollToAboutUs}>About Us</Button>
          {/* <Button color="inherit" onClick={scrollToMeetDoctors}>Meet Doctors</Button> */}
          <Button color="inherit" onClick={scrollToServices}>Services</Button>
          <Button color="inherit" onClick={scrollToContactUs}>Contact Us</Button>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Footer;
