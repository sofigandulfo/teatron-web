import "./App.css";
import Home from "./pages/Home";
import Lineup from "./pages/Lineup";
import Faq from "./pages/Faq";
import Reservation from "./pages/Reservation";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import MyReservations from "./pages/MyReservations";
import ProjectDetail from './pages/ProjectDetail'
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/lineup" element={<Lineup />}></Route>
          <Route path="/informacion" element={<Faq />}></Route>
          {/* <Route path="/reservas" element={<Reservation />}></Route> */}
          <Route path="/reservar/:projectName" element={<Reservation />} />
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/registro" element={<Register />}></Route>
          <Route path="/mis-reservas" element={<MyReservations />}></Route>
          <Route path="/proyectos/:projectName" element={<ProjectDetail/>}></Route>
        </Routes>
        <Footer />
      </div>
      
    </Router>
  );
}

export default App;
