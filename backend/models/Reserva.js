import connection from '../config/db.js';

export default class Reserva {
    static async create({ proyecto_id, asiento_id, nombre_cliente, contacto_cliente }) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO reservas (proyecto_id, asiento_id, nombre_cliente, contacto_cliente) VALUES (?, ?, ?, ?)', [proyecto_id, asiento_id, nombre_cliente, contacto_cliente], (error, resultados) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(resultados);
                }
            });
        });
    }
    static async findAllByProyectoId(proyecto_id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM reservas WHERE proyecto_id = ?', [proyecto_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

}