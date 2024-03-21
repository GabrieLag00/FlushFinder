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
    ultimoDatoDelArduino = data; // Almacena los datos recibidos
  });
});

// Emitir los últimos datos del Arduino cada 4 segundos
setInterval(() => {
  if (ultimoDatoDelArduino !== null) {
    io.emit('data', ultimoDatoDelArduino);
    console.log('Enviando último dato del Arduino a todos los clientes:', ultimoDatoDelArduino);
  } else {
    console.log("no llegan los datos");
  }
}, 5000);


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



