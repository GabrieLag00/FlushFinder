// app.js
import express from 'express';
import morgan from 'morgan';
import usersRoutes from './routes/usersRoutes.js'; // Asegúrate de ajustar la ruta de importación según tu estructura de directorios
import appRoutes from './routes/appRoutes.js';
import cors from 'cors';


const app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(cors());
// Middleware para logging
app.use(morgan('dev'));

// Usar las rutas 
app.use('/api/users', usersRoutes);
app.use('/api/edificios', appRoutes); // http://localhost:4000/api/edificios/edificios
app.use('/api/conserjes', appRoutes); // http://localhost:4000/api/conserjes/conserjes
app.use('/api/banos', appRoutes); // http://localhost:4000/api/banos/edificios/{id}/banos/{id} (10 edificios, cada edificio tiene 14 banos, 7 hombres, 7 mujeres)
export default app;
