import { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import { NavLink } from "react-router-dom";
import logoTeatron from '../../assets/icons/logo-teatron.png';
import "../../styles/Header.css";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component={NavLink} to="/lineup">
          <ListItemText primary="LINEUP" />
        </ListItem>
        <ListItem component={NavLink} to="/informacion">
          <ListItemText primary="INFORMACIÓN" />
        </ListItem>
        {loggedIn ? (
          <ListItem onClick={handleLogout}>
            <ListItemText primary="CERRAR SESIÓN" />
          </ListItem>
        ) : (
          <>
            <ListItem component={NavLink} to="/login">
              <ListItemText primary="INICIAR SESIÓN" />
            </ListItem>
            <ListItem component={NavLink} to="/registro">
              <ListItemText primary="REGISTRARSE" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      toggleDrawer(false)();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header>
      <NavLink to="/">
        <h1 className="header-logo">
          <img className='logo-teatron' src={logoTeatron} alt="Logo Teatron" />
        </h1>
      </NavLink>
      <div className="desktop-nav">
        <Navbar loggedIn={loggedIn} />
      </div>
      <div className="mobile-nav">
        <IconButton className="menu-button" onClick={toggleDrawer(true)}>
          <MenuIcon style={{ color: 'white' }} />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerList()}
        </Drawer>
      </div>
    </header>
  );
}

export default Header;
