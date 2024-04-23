import CountdownDate from "../components/Countdown/Countdown"
import Header from "../components/Header/Header"
import ProjectCarrousel from "../components/ProjectCarrousel/ProjectCarrousel"
import ReservationButton from "../components/ReservationButton/ReservationButton"


function Home() {
  return (
    <>
        <Header />
        <h1>TEATRON 2024</h1>
        <h2>EDICIÓN TECONTÉ</h2>

        <h3>28 DE JUNIO · 12:30H</h3>
        <p>EVENTO DE TEATRO</p>
        <p>ESEA DE TEATRO NINI MARSHALL (OLIDEN 1245, MATADEROS)</p>
        <ReservationButton />
        
        <ProjectCarrousel />
        
        <section>
          <article>
            <h2>EL TEATRO ES NUESTRA FORMA DE ESCAPE</h2>
            <h3>EL FESTIVAL MÁS ESPERADO DEL AÑO</h3>
            <p>¡Preparate para vivir una jornada de pura pasión artística en la TEATRON 2024!</p> 
            <p>1 día con +20 proyectos en vivo:
              desde apasionantes obras de teatro hasta otras formas de expresión, la Teatron es el lugar donde la diversidad y la innovación se encuentran. </p>
            <p> Cada proyecto es una oportunidad para explorar nuevos mundos, desafiar límites y emocionarte con lo inesperado.
              Vení a disfrutar la magia del teatro y otras expresiones artísticas que cobran vida ante tus ojos. </p>
          </article>
          <CountdownDate />
        </section>
    </>
  )
}

export default Home