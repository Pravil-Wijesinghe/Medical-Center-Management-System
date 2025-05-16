import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const Navbar = () => {
  return (
    <AppBar elevation={0} sx={{ px: 28, py: 0, backgroundColor: 'background.paper', color: 'black.main', maxHeight: 70 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link to="/">
          <img src={logo} alt="Logo" height="40" />
        </Link>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/about-us" color="inherit">About Us</Button>
          <Button component={Link} to="/services" color="inherit">Services</Button>
          <Button component={Link} to="/contact-us" color="inherit">Contact Us</Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <SecondaryButton>Sign Up</SecondaryButton>
          <PrimaryButton>Sign In</PrimaryButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
