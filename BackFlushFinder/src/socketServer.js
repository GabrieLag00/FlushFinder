// socketServer.js
import { Server as WebsocketServer } from 'socket.io';

export function startSocketServer(httpServer) {
  const io = new WebsocketServer(httpServer, {
    cors: {
      origin: '*', // Asegúrate de restringir esto en producción por seguridad
    },
  });

  io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado.');

    // Simular datos enviados desde el servidor, por ejemplo, cada 4 segundos

    // Aquí puedes añadir más lógica para manejar eventos de Socket.IO
  });

  console.log(`Servidor Socket.IO iniciado en el mismo puerto que el HTTP`);
}
