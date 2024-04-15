import { createServer } from 'http';
import { Server as WebsocketServer } from 'socket.io';
import { connect } from 'mqtt';  // Usando ES Modules
import app from './app.js';
import { connectDB } from './connect.js';
import '../envConfig.js'; // Asegura que este import esté al principio
import http from 'http';
import { habilitarManejoEdificios } from './controllers/conserjesSockets.js';
import { habilitarManejoSosReports } from './controllers/sosSockets.js';

// Configuración MQTT - Asegúrate de que el URL esté en el formato correcto
const mqttClient = connect('mqtt://broker.emqx.io:1883');


// Configuración del servidor WebSocket
const httpServerForSocketIO = createServer();
const io = new WebsocketServer(httpServerForSocketIO, {
  cors: {
    origin: '*',  // Configura esto adecuadamente según tus necesidades de seguridad
  },
});

mqttClient.on('connect', () => {
  console.log('Conectado al broker MQTT');
  mqttClient.subscribe(['Exit/10','Exit/20', 'Exit/30', 'Exit/40' ]);
});

io.on('connection', (socket) => {
  console.log('Cliente conectado a Socket.IO');
  mqttClient.on('message', (topic, message) => {
    console.log(`Mensaje recibido en el tópico ${topic}: ${message.toString()}`);
    socket.emit(topic, message.toString());
  });
});


// Iniciar servidor WebSocket en el puerto especificado en .env
httpServerForSocketIO.listen(process.env.SOCKET_IO_PORT, () => {
  console.log(`Servidor Socket.IO escuchando en el puerto ${process.env.SOCKET_IO_PORT}`);
});
//FUNCIONES SOCKETS
habilitarManejoEdificios(io);
habilitarManejoSosReports(io);

// Configuración del servidor HTTP con Express
const server = http.createServer(app);

// Iniciar servidor HTTP en el puerto especificado en .env
const port = process.env.HTTP_PORT; // Asegúrate de que esta variable esté definida en .env
server.listen(port, () => {
  console.log(`Servidor HTTP iniciado en el puerto ${port}`);
});

// Conectar a la base de datos
connectDB();


