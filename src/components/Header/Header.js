import Navbar from "../Navbar/Navbar";
import "../../styles/Header.css";
import { NavLink } from "react-router-dom"

function Header() {
  return (
    <header>
      <NavLink to="/"><h1 className="header-logo">TEATRON</h1></NavLink>
      <Navbar />
    </header>
  );
}

export default Header;
