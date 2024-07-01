// import img from "../assets/caretas.avif";
import { useParams } from "react-router-dom";
import projectData from "../data/proyectos.json";
import "../styles/ProjectDetail.css";
import ProjectCarrousel from "../components/ProjectCarrousel/ProjectCarrousel";
import ReservationButton from "../components/ReservationButton/ReservationButton";

function ProjectDetail() {
  const { projectName } = useParams();
  const projecto = projectData.find(
    (project) => project.nombre.toString() === projectName
  );

  if (!projecto) {
    return <p>Proyecto no encontrado</p>;
  }

  let projectImage;
  try {
    projectImage = require(`../assets/img/${projecto.foto}`);
  } catch (error) {
    projectImage = null;
  }


  return (
    <article className="project-detail-page">
      <section className="project-detail">
        <div className="project-detail-container">
          <picture className="project-detail-picture">
            <img
              className="project-detail-img"
              src={projectImage}
              alt={projecto.nombre}
            />
            <div className="project-detail-info">
              <p><strong>Tipo de proyecto:</strong> {projecto.tipo}</p>
              <p><strong>Duración estimada:</strong> {projecto.duracion}</p>
              <p><strong>Integrantes:</strong> {projecto.integrantes}</p>
              <p><strong>Espacio:</strong> {projecto.espacio}</p>
            </div>
          </picture>
          <div className="project-detail-primary-info">
            <h3 className="project-detail-title">{projecto.nombre}</h3>
            <p className="project-detail-description">{projecto.descripcion}</p>
          </div>
        </div>
        {projecto.espacio === "Escenario" && (
          <ReservationButton projectName={projecto.nombre}  className={'reserve-button'}/>
        )}
      </section>

      <section className="project-detail-carrousel">
        <ProjectCarrousel title={"OTROS PROYECTOS"} />
      </section>
    </article>
  );
}

export default ProjectDetail;

