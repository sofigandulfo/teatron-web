import { useState, useEffect } from 'react';
import CountdownDate from "../components/Countdown/Countdown";
import ProjectCarrousel from "../components/ProjectCarrousel/ProjectCarrousel";
import ReservationButton from "../components/ReservationButton/ReservationButton";
import '../styles/Home.css'
import UbicacionIcon from '../assets/icons/Ubicacion.js';

function Home() {
  const [textPositionTEATRON, setTextPositionTEATRON] = useState({ x: '50%', y: '40%' });
  const [textPosition2024, setTextPosition2024] = useState({ x: '50%', y: '80%' });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && window.innerWidth > 480) {
        // Modificar posiciones para pantalla entre 480px y 768px
        setTextPositionTEATRON({ x: '50%', y: '35%' });
        setTextPosition2024({ x: '50%', y: '62%' });
      } else if (window.innerWidth <= 480 && window.innerWidth > 425) {
        // Modificar posiciones para pantalla entre 425px y 480px
        setTextPositionTEATRON({ x: '50%', y: '35%' });
        setTextPosition2024({ x: '50%', y: '62%' });
      } else if (window.innerWidth <= 425 && window.innerWidth > 375) {
        // Modificar posiciones para pantalla entre 375px y 425px
        setTextPositionTEATRON({ x: '50%', y: '35%' });
        setTextPosition2024({ x: '50%', y: '58%' });
      } else if (window.innerWidth <= 375 && window.innerWidth > 320) {
        // Modificar posiciones para pantalla entre 320px y 375px
        setTextPositionTEATRON({ x: '50%', y: '35%' });
        setTextPosition2024({ x: '50%', y: '58%' });
      } else if (window.innerWidth <= 320) {
        // Modificar posiciones para pantalla menor o igual a 320px
        setTextPositionTEATRON({ x: '50%', y: '35%' });
        setTextPosition2024({ x: '50%', y: '55%' });
      } else {
        // Default: Pantalla mayor a 768px
        setTextPositionTEATRON({ x: '50%', y: '40%' });
        setTextPosition2024({ x: '50%', y: '80%' });
      }
    };
    // Ejecutar al cargar y al redimensionar la ventana
    handleResize();
    window.addEventListener('resize', handleResize);

    // Limpiar el event listener en el cleanup de useEffect
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <svg width="100%" height="200px">
        <text className="text-draw" x={textPositionTEATRON.x} y={textPositionTEATRON.y} textAnchor="middle">TEATRON</text>
        <text className="text-draw" x={textPosition2024.x} y={textPosition2024.y} textAnchor="middle">2024</text>
      </svg>

      <div className="home-data">
        <h3 className="home-data-date">5 DE JULIO · 12:30H</h3>
        <p className="home-data-info">EVENTO DE TEATRO</p>
        <a href="https://maps.app.goo.gl/7x6vMpULyi5JDeb2A" target="_blank" rel="noreferrer noopener" className="home-direction-link">
          <p className="home-data-info">
            <UbicacionIcon />
            ESEA DE TEATRO NINI MARSHALL
          </p>
        </a>
      </div>

      <ProjectCarrousel title={'PROYECTOS'}/>

      <section className="home-description-section">
        <article className="home-description">
          <h1 className="home-description-title">EL <span className="home-description-span-teatro">TEATRO</span> ES NUESTRA <br /> FORMA DE <span className="home-description-span-escape">ESCAPE</span></h1>
          <h3 className="home-description-subtitle">EL FESTIVAL MÁS ESPERADO DEL AÑO</h3>
          <p className="home-description-text">
            ¡Preparate para vivir una jornada de pura pasión artística en la 
            <strong> TEATRON 2024!</strong>
            <br /><br />
            <strong>+20 proyectos en vivo: </strong> <br/>
            desde apasionantes obras de teatro
            hasta otras formas de expresión, la Teatron es el lugar donde la
            diversidad y la innovación se encuentran.
            <br /><br />
            Cada proyecto es una oportunidad para explorar nuevos mundos,
            desafiar límites y emocionarte con lo inesperado. Vení a disfrutar
            la magia del teatro y otras expresiones artísticas que cobran vida
            ante tus ojos.
          </p>
        </article>
        <CountdownDate eventTimestamp={1720182600} />
      </section>
    </>
  );
}

export default Home;
