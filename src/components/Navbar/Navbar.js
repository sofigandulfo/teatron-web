import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import "../../styles/Header.css";

function Navbar({ loggedIn }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleMenuClose();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/lineup" activeClassName="active">LINEUP</NavLink>
        </li>
        <li>
          <NavLink to="/informacion" activeClassName="active">INFORMACIÓN</NavLink>
        </li>
        <li className="user-menu-container">
          <IconButton onClick={handleMenuOpen} className="user-button">
            <AccountCircleIcon style={{ fontSize: 40, color: 'white' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {loggedIn ? (
              <MenuItem onClick={handleLogout}>CERRAR SESIÓN</MenuItem>
            ) : (
              <>
                <MenuItem component={NavLink} to="/login">INICIAR SESIÓN</MenuItem>
                <MenuItem component={NavLink} to="/registro">REGISTRARSE</MenuItem>
              </>
            )}
          </Menu>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
