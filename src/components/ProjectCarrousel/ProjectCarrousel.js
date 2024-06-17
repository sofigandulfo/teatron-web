import Slider from "react-slick";
import proyectos from '../../data/proyectos.json';
import "../../styles/ProjectCarrousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectCard from "../ProjectCard/ProjectCard";

function ProjectCarrousel({ title }) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="project-carrousel">
      <h3 className="project-carrousel-title">{title}</h3>
      <Slider {...settings}>   
        {proyectos.map((project) => (
          <div key={project.id}> {/* Cada tarjeta debe estar dentro de un elemento de carrusel separado */}
            <ProjectCard project={project} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProjectCarrousel;