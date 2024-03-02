// app.js
import express from 'express';
import morgan from 'morgan';
import usersRoutes from './routes/usersRoutes.js'; // Asegúrate de ajustar la ruta de importación según tu estructura de directorios
import appRoutes from './routes/appRoutes.js';


const app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Middleware para logging
app.use(morgan('dev'));

// Usar las rutas de usuarios
app.use('/api/users', usersRoutes);
app.use('/api/edificios', appRoutes);
export default app;
