import { Link } from "react-router-dom";
import proyectos from "../data/proyectos.json";
import "../styles/Lineup.css";

function Lineup() {
  return (
    <>
      <h1 className="lineup-title">LINEUP</h1>
      <div className="lineup">
        <table className="lineup-table">
          <tbody className="lineup-tablebody">
            {proyectos.map((project) => (
              <tr key={project.id} className="lineup-tablerow">
                <td className="lineup-td">{project.hora}</td>
                <td className="lineup-td">
                  <Link to={`/proyectos/${encodeURIComponent(project.nombre)}`}>
                    {project.nombre}
                  </Link>
                </td>
                <td className="lineup-td">{project.espacio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Lineup;
