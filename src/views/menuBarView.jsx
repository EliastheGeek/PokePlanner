import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import FaceIcon from '@mui/icons-material/Face';

export default function MenuBarView(props) {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const menuOpen = Boolean(menuAnchorEl);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleNavigate = (hash) => () => {
    window.location.hash = hash;
    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#ffffff', color: '#000000' }}
        elevation={1}
      >
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} onClick={ handleHomeACB }>Pokemon Team Builder</Typography>
          <IconButton
            size="large"
            aria-label="menu"
            onClick={handleMenuClick}
            sx={{
              mr: 1,
              borderRadius: 1,
              px: 1.5,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <Typography variant="h6" component="div">
              Menu
            </Typography>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleNavigate('#/')}>Home</MenuItem>
            <MenuItem onClick={handleNavigate('#/team')}>TeamBuilder</MenuItem>
            <MenuItem onClick={handleNavigate('#/dmgcalc')}>Damage Calculator</MenuItem>
          </Menu>

          {props.user ? 
            <Button sx={{ backgroundColor: '#424242', color: '#fff', '&:hover': { backgroundColor: '#2e2e2e', }, }} onClick={ handleLogoutACB }>Logout<FaceIcon sx={{ ml:1 }} /></Button> :
            <Button sx={{ backgroundColor: '#424242', color: '#fff', '&:hover': { backgroundColor: '#2e2e2e', }, }} onClick={ handleLoginMenuACB }>Login</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );

  function handleHomeACB(){ window.location.hash = "#/"; }
  function handleLoginMenuACB(){ window.location.hash = "#/login"; }
  function handleLogoutACB(){ props.onLogout(); }
}