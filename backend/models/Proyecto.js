
import connection from '../config/db.js';

export default class Proyecto {
  static async obtenerPorId(id) {
    return new Promise((resolve, reject) => {
       connection.query('SELECT * FROM proyectos WHERE proyecto_id = ?', [id], (error, resultados) => {
        if (error) {
          reject(error);
        } else {
          resolve(resultados[0]);
        }
      });
    });
  }
}

