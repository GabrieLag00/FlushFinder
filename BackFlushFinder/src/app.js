// app.js
import express from 'express';
import morgan from 'morgan';
import usersRoutes from './routes/usersRoutes.js'; // Asegúrate de ajustar la ruta de importación según tu estructura de directorios
import appRoutes from './routes/appRoutes.js';
import conserjesRoutes from './routes/conserjesRoutes.js';
import cors from 'cors'
import path from 'path';


const app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
// Middleware para logging
app.use(morgan('dev'));

// Usar las rutas 
app.use('/api/conserjes', conserjesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/edificios', appRoutes); // http://localhost:4000/api/edificios/edificios
app.use('/api/banos', appRoutes); // http://localhost:4000/api/banos/edificios/{id}/banos/{id} (10 edificios, cada edificio tiene 14 banos, 7 hombres, 7 mujeres)
app.use('/api/sos', appRoutes);
// Servir archivo HTML en la ruta raíz ("/")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Cambia 'public' por la carpeta donde está tu archivo HTML
  });

export default app;
