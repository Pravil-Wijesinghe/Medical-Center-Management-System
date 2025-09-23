import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItemButton, ListItemText, Toolbar, AppBar, Typography, IconButton, Avatar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';

const drawerWidth = 260;

const navItems = [
  { label: 'Basic Information', to: '/dashboard/basic-information' },
  { label: 'Security', to: '/dashboard/security' },
  { label: 'Appointments', to: '/dashboard/appointments' },
  { label: 'Family Members', to: '/dashboard/family-members' },
  { label: 'Medical History', to: '/dashboard/medical-history' },
  { label: 'Notification', to: '/dashboard/notifications' },
];

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Avatar sx={{ bgcolor: 'success.main' }}>{(user?.firstName?.[0] || 'U').toUpperCase()}</Avatar>
        <Box>
          <Typography variant="subtitle1">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'User Name'}</Typography>
          <Typography variant="caption" color="text.secondary">{user?.email || 'user@email.com'}</Typography>
        </Box>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={Link}
            to={item.to}
            selected={location.pathname === item.to}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Button variant="outlined" color="success" fullWidth onClick={() => navigate('/')}>Home</Button>
      <Button sx={{ mt: 1 }} variant="contained" color="success" fullWidth onClick={() => dispatch(logoutUser()).then(() => navigate('/login'))}>Logout</Button>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f7f7f7' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'background.paper', color: 'text.primary', boxShadow: 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>Med Connect</Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="dashboard navigation">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}


