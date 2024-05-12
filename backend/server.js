import express from 'express';
import cors from 'cors';
import ProyectoController from './controllers/ProyectoController.js';
import ReservaController from './controllers/ReservaController.js';

const app = express();

const PORT = process.env.PORT ?? 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('¡Backend de Teatron en funcionamiento!')
});

// proyectos
app.get('/proyectos/:id', ProyectoController.obtenerPorId)


//reservas
app.get('/reservas/:proyecto_id', ReservaController.obtenerReservasPorProyecto);
app.post('/reservas/:proyecto_id', ReservaController.crearReserva);

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`)
})

