import app from './app.js';
import { connectDB } from './connect.js';
import { Server as WebsocketServer } from 'socket.io';
import http from 'http';
import { createServer } from 'http';
import '../envConfig.js'; // Asegura que este import esté al principio

const httpServerForSocketIO = createServer();
const io = new WebsocketServer(httpServerForSocketIO, {
  cors: {
    origin: '*', // Asegúrate de ajustar esto según tus necesidades de seguridad
  },
});

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado a Socket.IO');
});

// Usar el puerto definido en .env para Socket.IO
httpServerForSocketIO.listen(process.env.SOCKET_IO_PORT, () => {
  console.log(`Servidor Socket.IO escuchando en el puerto ${process.env.SOCKET_IO_PORT}`);
});

// Crear el servidor HTTP con Express
const server = http.createServer(app);

// Usar el puerto definido en .env para el servidor HTTP
const port = process.env.HTTP_PORT; // Cambiar aquí si decides usar HTTP_PORT
server.listen(port, () => {
  console.log(`Servidor HTTP iniciado en el puerto ${port}`);
});
connectDB();





