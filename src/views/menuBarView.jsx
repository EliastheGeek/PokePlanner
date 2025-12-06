import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function MenuBarView(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color=" gray">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Pokemon Team Builder
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Menu
              </Typography>
              <MenuIcon />
          </IconButton>

          {props.user ? 
            <Button sx={{ backgroundColor: '#424242', color: '#fff', '&:hover': { backgroundColor: '#2e2e2e', }, }} onClick={ handleLogoutACB }>Logout</Button> :
            <Button sx={{ backgroundColor: '#424242', color: '#fff', '&:hover': { backgroundColor: '#2e2e2e', }, }} onClick={ handleLoginMenuACB }>Login</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );

  function handleLoginMenuACB(){ window.location.hash = "#/login"; }
  function handleLogoutACB(){ props.onLogout(); }
}