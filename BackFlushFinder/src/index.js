import 'dotenv/config';
import app from './app.js';
import { connectDB } from './connect.js';
import { Server as WebsocketServer } from 'socket.io';
import http from 'http';
import { createServer } from 'http';

const httpServerForSocketIO = createServer();
const io = new WebsocketServer(httpServerForSocketIO, {
  cors: {
    origin: '*', // Asegúrate de ajustar esto según tus necesidades de seguridad
  },
});

let ultimoDatoDelArduino = null;

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado a Socket.IO');

  socket.on('data', (data) => {
    // Asumimos que data es un objeto que contiene la distancia, p.ej., { distance: 5 }
    ultimoDatoDelArduino = data; // Almacena los datos recibidos
  });
});

// Emitir los últimos datos del Arduino cada 4 segundos
setInterval(() => {
  if (ultimoDatoDelArduino !== null) {
    const estado = ultimoDatoDelArduino.distance >= 10 ? "El baño está libre" : "El baño está ocupado";
    // Emitimos tanto la distancia como el estado
    io.emit('bathroomStatus', { distance: ultimoDatoDelArduino.distance, status: estado });
    console.log('Enviando último dato del Arduino a todos los clientes:', ultimoDatoDelArduino, estado);
  } else {
    console.log("No llegan los datos");
  }
}, 4000);

httpServerForSocketIO.listen(8765, () => {
  console.log('Servidor Socket.IO escuchando en el puerto 8765');
});

// Crear el servidor HTTP con Express
const server = http.createServer(app);

// Iniciar el servidor HTTP
const port = process.env.PORT || 5000; // Usar el puerto definido en el archivo .env o el puerto 5000 por defecto
server.listen(port, () => {
  console.log(`Servidor HTTP iniciado en el puerto ${port}`);
});
connectDB();







