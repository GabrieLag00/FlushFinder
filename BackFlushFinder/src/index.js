import express from 'express';
import { createServer } from 'http';
import { Server as WebsocketServer } from 'socket.io';
import { connectDB } from './connect.js';
import { error } from 'console';

const app = express();

const httpServerForExpress = createServer(app);
httpServerForExpress.listen(4000, () => {
  console.log('Servidor HTTP (Express) iniciado en el puerto 4000');
  // Conectar a la base de datos
  console.log(error);
  connectDB();
});

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
    ultimoDatoDelArduino = data; // Almacena los datos recibidos
  });
});

// Emitir los últimos datos del Arduino cada 4 segundos
setInterval(() => {
  if (ultimoDatoDelArduino !== null) {
    io.emit('data', ultimoDatoDelArduino);
    console.log('Enviando último dato del Arduino a todos los clientes:', ultimoDatoDelArduino);
  } else {
    console.log("no llegan los datos", error);
  }
}, 4000);

httpServerForSocketIO.listen(8765, () => {
  console.log('Servidor Socket.IO escuchando en el puerto 8765');
});






