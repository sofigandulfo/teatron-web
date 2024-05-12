import Navbar from "../Navbar/Navbar";
import "../../styles/Header.css";

function Header() {
  return (
    <header>
      <h1 className="header-logo">TEATRON</h1>
      <Navbar />
    </header>
  );
}

export default Header;
