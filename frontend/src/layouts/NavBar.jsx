import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <AppBar position="static" color="background.paper" elevation={0} sx={{ px: 28, py: 1 }}>
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
          <Button variant="outlined" color="primary" sx={{ borderRadius: 20, px: 4 }}>Sign Up</Button>
          <Button variant="contained" color="primary" sx={{ borderRadius: 20, px: 4 }}>Sign In</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
