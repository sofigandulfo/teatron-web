import Reserva from '../models/Reserva.js';

export default class ReservaController {
    static async crearReserva(req, res){
        // crear reserva
        const { proyecto_id } = req.params;
        const { asiento_id, nombre_cliente, contacto_cliente } = req.body;

        try {
            const nuevaReserva = await Reserva.create({
                proyecto_id,
                asiento_id,
                nombre_cliente,
                contacto_cliente
            });
            res.status(201).json(nuevaReserva);
        } catch(error) {
            console.error('Error al crear la reserva: ', error);
            res.status(500).json({ error: 'Error al crear la reserva' });
        }
    }

    static async obtenerReservasPorProyecto(req, res){
        // obtener reservas
        const { proyecto_id } = req.params;

        try{
            const reservas = await Reserva.findAllByProyectoId(proyecto_id);
            res.json(reservas);
        } catch( error ) {
            console.error('Error al obtener las reservas: ', error);
            res.status(500).json({ error: 'Error al obtener las reservas' });
        }
    }

}