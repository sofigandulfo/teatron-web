import Proyecto from '../models/Proyecto.js';

export default class ProyectoController {
    static async obtenerPorId(req, res){
        const { id } = req.params;
        
        try {
            const proyecto = await Proyecto.obtenerPorId(id);
            if(!proyecto){
                return res.status(404).json({ error: 'Proyecto no encontrado :(' });
            }
            res.json(proyecto)
        }
        catch  (error){
            console.log('Error al obtener el proyecto: ', error);
            res.status(500).json({ error: `Error al obtener el proyecto ${error}` })
        }
    }
}

