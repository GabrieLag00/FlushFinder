import { Server as WebsocketServer } from 'socket.io';

export function startSocketServer(httpServer, port) {
  const io = new WebsocketServer(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado.');

    // Aquí puedes añadir lógica adicional para manejar eventos de Socket.IO
  });

  console.log(`Servidor Socket.IO iniciado en el puerto ${port}`);

  return io;
}

