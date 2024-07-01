import { Link } from "react-router-dom";
import "../../styles/ProjectCarrousel.css";
import projectData from "../../data/proyectos.json";

function ProjectCard({ project }) {
  const proyecto = projectData.find(
    (proj) => proj.nombre.toString() === project.nombre.toString()
  );

  let projectImage;
  try {
    projectImage = require(`../../assets/img/${proyecto.foto}`);
  } catch (error) {
    projectImage = null;
  }

  return (
    <article className="project-card" key={project.id}>
      <picture className="project-card-picture">
        <img
          className="project-card-img"
          src={projectImage}
          alt={`imagen del proyecto: ${project.nombre}`}
        />
      </picture>
      <div className="project-card-data">
        <div className="project-card-info">
          <h2 className="project-card-name">{project.nombre}</h2>
          <h3 className="project-card-type">{project.tipo}</h3>
        </div>
        <Link to={`/proyectos/${project.nombre}`}>
          <button className="project-card-button">VER MÁS</button>
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;