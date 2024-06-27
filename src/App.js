import "./App.css";
import Home from "./pages/Home";
import Lineup from "./pages/Lineup";
import Faq from "./pages/Faq";
import Reservation from "./pages/Reservation";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import ProjectDetail from './pages/ProjectDetail'
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lineup" element={<Lineup />} />
          <Route path="/informacion" element={<Faq />} />
          <Route path="/reservar/:projectName" element={<Reservation />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/proyectos/:projectName" element={<ProjectDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
