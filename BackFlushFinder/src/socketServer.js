// conexion a socket 
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { connectDB } from './connect.js';

const app = express();

// Aplicar middleware CORS para permitir solicitudes de cualquier origen
app.use(cors());

// Crea un servidor HTTP basado en la aplicación Express
const httpServer = http.createServer(app);

// Configura el servidor Socket.IO con soporte para CORS
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*", // Permite solicitudes de cualquier origen
    methods: ["GET", "POST"], // Métodos HTTP permitidos para CORS
    credentials: true // Permite cookies y datos de sesión en solicitudes entre sitios
  },
});

// Evento de conexión para manejar clientes WebSocket
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado.');
  
  // Escuchar datos del script de Python
  socket.on('data', (data) => {
    // Reenviar esos datos a todos los clientes
    io.emit('data', data);
  });
});

// Ejemplo de una ruta API REST
app.get('/api', (req, res) => {
  res.send('API REST respondiendo.');
});

// Escucha en el puerto especificado para solicitudes HTTP y conexiones WebSocket
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
  connectDB(); // Conectarse a la base de datos, si es necesario
});


