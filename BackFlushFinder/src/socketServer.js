// socketServer.js

import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const httpServer = createServer();
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*', // Ajusta según tus necesidades de CORS
  },
});

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado a Socket.IO');
  // Aquí manejas los eventos de Socket.IO
});

const SOCKET_PORT = 8765;
httpServer.listen(SOCKET_PORT, () => {
  console.log(`Servidor Socket.IO escuchando en el puerto ${SOCKET_PORT}`);
});
