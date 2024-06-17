
import proyectos from "../data/proyectos.json";
import "../styles/Lineup.css";

function Lineup() {
  return (
    <>
      <h1 className="lineup-title">LINEUP</h1>
      <article className="lineup">
        <table className="lineup-table">
          <thead className="lineup-tablehead">
            <tr className="lineup-tablerow-head">
              <th className="lineup-th">HORA</th>
              <th className="lineup-th">PROYECTO</th>
              <th className="lineup-th">ESPACIO</th>
            </tr>
          </thead >
          <tbody className="lineup-tablebody">
            {proyectos.map((project) => (

              <tr key={project.id} className="lineup-tablerow">
                <td className="lineup-td">{project.hora}</td>
                <td className="lineup-td">{project.nombre}</td>
                <td className="lineup-td">{project.espacio}</td>
              </tr>

            ))}
          </tbody>
        </table>
      </article>
    </>
  );
}

export default Lineup;
