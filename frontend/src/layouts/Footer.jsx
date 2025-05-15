import { Box, Toolbar } from "@mui/material";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Footer = () => {
  return (
    <Box sx={{ px: 28, py: 0, }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <p>© {new Date().getFullYear()} MedConnect. All rights reserved.</p>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/about-us" color="inherit">About Us</Button>
            <Button component={Link} to="/services" color="inherit">Services</Button>
            <Button component={Link} to="/contact-us" color="inherit">Contact Us</Button>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Footer;
