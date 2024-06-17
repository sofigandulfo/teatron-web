import { useState } from "react"
import { NavLink } from "react-router-dom"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const handleLogout = () => {
    setLoggedIn(false);
    setMenuOpen(false);
  }

  return (
    <nav>
      <ul>
        <li><NavLink to="/lineup" className={({ isActive }) => (isActive ? 'active' : '')}>LINEUP</NavLink></li>
        <li><NavLink to="/informacion" className={({ isActive }) => (isActive ? 'active' : '')}>INFORMACIÓN</NavLink></li>
        {/* <li><NavLink to="/reservas" className={({ isActive }) => (isActive ? 'active' : '')}>RESERVAS</NavLink></li> */}
        <li>
          <button onClick={toggleMenu}>USER</button>
          {menuOpen && (
            <div className="user-menu">
              {loggedIn ? (
                <>
                  <NavLink to="/mis-reservas">MIS RESERVAS</NavLink>
                  <button onClick={handleLogout}>CERRAR SESIÓN</button>
                </>
              ) : (
                <>
                  <NavLink to="/login">INICIAR SESIÓN</NavLink>
                  <NavLink to="/registro">REGISTRARSE</NavLink>
                </>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar