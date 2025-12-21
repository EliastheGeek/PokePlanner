import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import FaceIcon from "@mui/icons-material/Face";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


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


  const [value, setValue] = React.useState("one");

  React.useEffect(function () {
    function syncTabWithHash() {
      if (window.location.hash === "#/team") {
        setValue("two");
      } else if (window.location.hash === "#/dmgcalc") {
        setValue("three");
      } else if (window.location.hash === "#/" || window.location.hash === "") {
        setValue("one");
      }else {
        setValue(false);
      }
    }

    syncTabWithHash();
    window.addEventListener("hashchange", syncTabWithHash);

    return function () {
      window.removeEventListener("hashchange", syncTabWithHash);
    };
  }, []);

  function handleChange(event, newValue) {
    setValue(newValue);

    if (newValue === "two") {
      window.location.hash = "#/team";
    } else if (newValue === "three") {
      window.location.hash = "#/dmgcalc";
    } else {
      window.location.hash = "#/";
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#ffffff", color: "#000000" }}
        elevation={1}
      >
        <Toolbar>
          <Typography className="appName" variant="h5" component="div" sx={{ flexGrow: 1, cursor: "pointer", }} onClick={ handleHomeACB }>Pokemon Team Builder</Typography>
          <Box className="defultMenu">
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="primary tabs example"
            >
              <Tab value="one" label="Get Started" />
              <Tab value="two" label="Team Builder" />
              <Tab value="three" label="Damage Calculator" />
            </Tabs>
          </Box>
          <Box className="burgerMenu" >
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleMenuClick}
              sx={{ mr: 1, borderRadius: 1, px: 1.5,
                py: 0.5, display: "flex", alignItems: "center",
                gap: 1, "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)", }, }}>
            <Typography variant="h6" component="div">
                Menu
            </Typography>
            <MenuIcon />
              </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right",}}
              transformOrigin={{vertical: "top",horizontal: "right",}}>

              <MenuItem onClick={handleNavigate("#/")}>Get Started</MenuItem>
              <MenuItem onClick={handleNavigate("#/team")}>TeamBuilder</MenuItem>
              <MenuItem onClick={handleNavigate("#/dmgcalc")}>Damage Calculator</MenuItem>
            </Menu>
          </Box>
          {props.user ? 
            <Button sx={{ minWidth: 110, backgroundColor: "#424242", color: "#fff", "&:hover": { backgroundColor: "#2e2e2e", }, }} onClick={ handleLogoutACB }>Logout<FaceIcon sx={{ ml:1 }} /></Button> :
            <Button sx={{ minWidth: 110, display: "flex", backgroundColor: "#424242", color: "#fff", "&:hover": { backgroundColor: "#2e2e2e", }, }} onClick={ handleLoginMenuACB }>Login</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );

  function handleHomeACB(){ window.location.hash = "#/"; }
  function handleLoginMenuACB(){ window.location.hash = "#/login"; }
  function handleLogoutACB(){ props.onLogout(); }
}