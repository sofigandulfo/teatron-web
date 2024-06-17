import { useState } from "react";
import { useParams } from "react-router-dom";
import projectData from "../data/proyectos.json";
import SeatMap from "../components/SeatMap/SeatMap";
import UbicacionIcon from "../assets/icons/Ubicacion";
import "../styles/Reservation.css";

function Reservation() {
  const { projectName } = useParams();
  const proyecto = projectData.find(
    (project) => project.nombre.toString() === projectName
  );

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatChange = (newSelectedSeats) => {
    setSelectedSeats(newSelectedSeats);
  };

  if (!proyecto) {
    return <div>Proyecto no encontrado</div>;
  }

  let projectImage;
  try {
    projectImage = require(`../assets/${proyecto.foto}`);
  } catch (error) {
    projectImage = null;
  }

  return (
    <>
    <p>Para seleccionar los asientos, hacé click sobre una ubicación disponible. <br/>
    Esta pantalla es un indicador de la disposición de las ubicaciones en la sala, <br/> y no representa distancias reales.</p>
      <section className="reservation-section">
        <article className="seatmap">
          <SeatMap rows={8} columns={10} onSeatChange={handleSeatChange} />
        </article>
        <article className="project-details-article">
          <div className="project-details-info">
            <div className="project-details">
              <div className="project-header">
                <picture className="project-picture">
                  <img
                    src={projectImage}
                    alt="Proyecto"
                    className="project-image"
                  ></img>
                </picture>
                <div className="project-info">
                  <h2 className="project-name">{proyecto.nombre}</h2>
                  <div className="project-location-info">
                    <UbicacionIcon />
                    <p className="project-espacio">
                      ESEA DE TEATRO NINI MARSHALL <br /> {proyecto.espacio}
                    </p>
                  </div>
                  <p className="project-ubicacion">OLIDEN 1245, MATADEROS</p>
                  <p className="project-fecha">
                    VIERNES 5 JULIO {proyecto.hora}
                  </p>
                </div>
              </div>
              <div className="selected-seat-info">
                <p className="tickets">{selectedSeats.length} ENTRADAS</p>
                <p className="selected-seat">
                  (ASIENTOS: {selectedSeats.join(", ")})
                </p>
              </div>
            </div>
          </div>
          <div className="project-buttons">
            <button className="btn">VOLVER</button>
            <button className="btn">SIGUIENTE</button>
          </div>
        </article>
      </section>
    </>
  );
}

export default Reservation;

