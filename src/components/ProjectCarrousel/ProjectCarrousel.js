import Slider from "react-slick";
import proyectos from "../../data/proyectos.json";
import "../../styles/ProjectCarrousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectCard from "../ProjectCard/ProjectCard";

function ProjectCarrousel({ title }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    dots: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const filteredProjects = proyectos.filter(
    (project) =>
      project.nombre !== "MÚSICA" &&
      project.nombre !== "TEATRON" &&
      project.nombre !== "CIERRE"
  );

  return (
    <div className="project-carrousel">
      <h3 className="project-carrousel-title">{title}</h3>
      <Slider {...settings}>
        {filteredProjects.map((project) => (
          <div key={project.id}>
            {/* Cada tarjeta debe estar dentro de un elemento de carrusel separado */}
            <ProjectCard project={project} />
          </div>
        ))}
      </Slider>
      <div className="carousel-instructions">
        <p>Desliza para ver más proyectos</p>
      </div>
    </div>
  );
}

export default ProjectCarrousel;
