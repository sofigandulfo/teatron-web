import "../../styles/ProjectCarrousel.css";
import img from "../../assets/caretas.avif";

function ProjectCard({ project }) {
  return (
    <>
      <article className="project-card" key={project.id}>
        <picture className="project-card-picture">
          <img className="project-card-img" src={img} alt={project.title} />
        </picture>
        <div className="project-card-data">
          <div className="project-card-info">
            <h2 className="project-card-name">{project.nombre}</h2>
            <h3 className="project-card-type">{project.tipo}</h3>
          </div>
          <button className="project-card-button">VER MÁS</button>
        </div>
      </article>
    </>
  );
}

export default ProjectCard;
