import { Server as WebsocketServer } from 'socket.io';
import http from 'http';

export function startSocketServer(port) {
  const server = http.createServer();
  const io = new WebsocketServer(server, {
    cors: {
      origin: '*',
    },
  });

  server.listen(port, () => {
    console.log(`Servidor Socket.IO iniciado en el puerto ${port}`);
  });

  io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado.');

    // Aquí puedes añadir lógica adicional para manejar eventos de Socket.IO
  });

  return io;
}
