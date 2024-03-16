import 'dotenv/config';
import app from './app.js';
import { connectDB } from './connect.js';
import { Server as WebsocketServer } from 'socket.io';
import http from 'http';

// Crear el servidor HTTP con Express
const server = http.createServer(app);

// Conectar WebSocket al mismo servidor HTTP
const io = new WebsocketServer(server, {
  cors: {
    origin: '*', // Asegúrate de restringir esto en producción por seguridad
  },
});

// Manejar conexión WebSocket
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado.');

  // Simular datos enviados desde el servidor, por ejemplo, cada 4 segundos
  //setInterval(() => {
    //const data = { mensaje: 'Hola desde el servidor' };
    //socket.emit('datosArduino', data);
  //}, 4000);
});

// Iniciar el servidor HTTP
const port = process.env.PORT || 5000; // Usar el puerto definido en el archivo .env o el puerto 5000 por defecto
server.listen(port, () => {
  console.log(`Servidor HTTP iniciado en el puerto ${port}`);
});

// Conectar a la base de datos
connectDB();



