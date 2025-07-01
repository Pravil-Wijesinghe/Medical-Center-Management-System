import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { logoutUser } from '../store/slices/authSlice';
import { getProfilePicture } from '../services/mediaService';

const Navbar = ({ scrollToHero, scrollToAboutUs, scrollToServices, scrollToContactUs }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (user?.profilePicture) {
        try {
          const response = await getProfilePicture(user.profilePicture);
          const imageUrl = URL.createObjectURL(response.data);
          setProfilePictureUrl(imageUrl);
        } catch (error) {
          console.error('Failed to fetch profile picture:', error);
        }
      }
    };

    fetchProfilePicture();

    // Cleanup function to revoke the object URL to avoid memory leaks
    return () => {
      if (profilePictureUrl) {
        URL.revokeObjectURL(profilePictureUrl);
      }
    };
  }, [user?.profilePicture]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      handleClose();
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Logout error:', error);
      handleClose();
    }
  };

  const handleDashboardClick = () => {
    handleClose();
    navigate('/dashboard');
  };

  // Function to get user's initials for avatar
  const getUserInitials = (firstName, lastName) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    return 'U';
  };

  return (
    <AppBar elevation={0} sx={{ px: 28, py: 0, backgroundColor: 'background.paper', color: 'black.main', maxHeight: 70 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link to="/">
          <img src={logo} alt="Logo" height="40" />
        </Link>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={scrollToHero}>Home</Button>
          <Button color="inherit" onClick={scrollToAboutUs}>About Us</Button>
          <Button color="inherit" onClick={scrollToServices}>Services</Button>
          <Button color="inherit" onClick={scrollToContactUs}>Contact Us</Button>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {!isAuthenticated ? (
            // Show login/signup buttons when not authenticated
            <>
              <SecondaryButton href='/signup'>Sign Up</SecondaryButton>
              <PrimaryButton href='/login'>Sign In</PrimaryButton>
            </>
          ) : (
            // Show user profile when authenticated
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer', 
                gap: 1,  
                borderRadius: 1, 
                padding: 1,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              }} 
              onClick={handleOpen}
            >
              <ArrowDropDownIcon />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                  {user?.firstName && user?.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : user?.username || 'User'
                  }
                </Typography>
                <Typography color="grey" sx={{ fontSize: 12, fontWeight: 400 }}>
                  {user?.email || 'email@email.com'}
                </Typography>
              </Box>
              {profilePictureUrl ? (
                <Avatar
                  src={profilePictureUrl}
                  alt={user?.firstName || 'User'}
                  sx={{ width: 36, height: 36 }}
                />
              ) : (
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
                  {getUserInitials(user?.firstName, user?.lastName)}
                </Avatar>
              )}
            </Box>
          )}
        </Box>
      </Toolbar>

      {/* User Menu - Only show when authenticated */}
      {isAuthenticated && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            mt: 1,
            '& .MuiPaper-root': {
              backgroundColor: 'background.paper',
              color: 'black.main',
              boxShadow: 3,
              borderRadius: 2,
              minWidth: 200,
            },
          }}
        >
          {/* User Info Header */}
          <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
            {profilePictureUrl ? (
              <Avatar
                src={profilePictureUrl}
                alt={user?.firstName || 'User'}
                sx={{ width: 48, height: 48 }}
              />
            ) : (
              <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>
                {getUserInitials(user?.firstName, user?.lastName)}
              </Avatar>
            )}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {user?.firstName && user?.lastName 
                  ? `${user.firstName} ${user.lastName}` 
                  : user?.username || 'User'
                }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email || 'email@email.com'}
              </Typography>
            </Box>
          </Box>
          
          <Divider />
          
          {/* Profile MenuItem */}
          <MenuItem onClick={handleDashboardClick}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Dashboard
          </MenuItem>
          
          <Divider />
          
          {/* Logout MenuItem */}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}
    </AppBar>
  );
};

export default Navbar;