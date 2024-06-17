import CountdownDate from "../components/Countdown/Countdown";
import ProjectCarrousel from "../components/ProjectCarrousel/ProjectCarrousel";
import ReservationButton from "../components/ReservationButton/ReservationButton";
import '../styles/Home.css'
import UbicacionIcon from '../assets/icons/Ubicacion.js';



function Home() {

  return (
    <>
      <svg width="100%" height="200px">
        <text className="text-draw" x="50%" y="40%" textAnchor="middle">TEATRON</text>
        <text className="text-draw" x="50%" y="80%" textAnchor="middle">2024</text>
      </svg>
      {/* <h2 className="home-subtitle">EDICIÓN TECONTÉ</h2> */}


      <div className="home-data">
        <h3 className="home-data-date">5 DE JULIO · 12:30H</h3>
        <p className="home-data-info">EVENTO DE TEATRO</p>
        <a href="https://maps.app.goo.gl/7x6vMpULyi5JDeb2A" target="_blank" rel="noreferrer noopener" className="home-direction-link"><p className="home-data-info">
          <UbicacionIcon />
          ESEA DE TEATRO NINI MARSHALL</p></a>
      </div>
      <ReservationButton className="home-reservation-button"/>

      <ProjectCarrousel title={'PROYECTOS'}/>

      <section className="home-description-section">
        <article className="home-description">
          <h1 className="home-description-title">EL <span className="home-description-span-teatro">TEATRO</span> ES NUESTRA FORMA DE <span className="home-description-span-escape">ESCAPE</span></h1>
          <h3 className="home-description-subtitle">EL FESTIVAL MÁS ESPERADO DEL AÑO</h3>
          <p className="home-description-text">
            ¡Preparate para vivir una jornada de pura pasión artística en la<br />
            TEATRON 2024!
         <br /><br />
         
            1 día con +20 proyectos en vivo: <br /> desde apasionantes obras de teatro
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
