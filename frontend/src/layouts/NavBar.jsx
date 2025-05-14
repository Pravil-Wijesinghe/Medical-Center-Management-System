import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link to="/">
          <img src={logo} alt="Logo" height="40" />
        </Link>
        <div>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/about-us" color="inherit">About Us</Button>
          <Button component={Link} to="/services" color="inherit">Services</Button>
          <Button component={Link} to="/contact-us" color="inherit">Contact Us</Button>
        </div>
        <div>
          <Button variant="contained" color="primary" sx={{ mr: 1 }}>Sign Up</Button>
          <Button variant="outlined" color="primary">Sign In</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
