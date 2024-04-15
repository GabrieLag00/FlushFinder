import Edificio from '../models/edificios.js'; // Asegúrate de que la ruta al modelo es correcta

export const habilitarManejoEdificios = (io) => {
  io.on('connection', (socket) => {
    console.log(`Conserje conectado: ${socket.id}`);  // Asegúrate de que esta línea esté presente para ver quién se conecta

    socket.on('deshabilitar-edificio', async ({ edificioId }) => {
      try {
        const resultado = await Edificio.update(
          { Disponibilidad: 'no disponible' },
          { where: { EdificioID: edificioId, Disponibilidad: 'disponible' } }
        );
        if (resultado[0] > 0) {
          io.emit('edificio-deshabilitado', { edificioId });
          console.log(`Edificio ${edificioId} deshabilitado por el conserje ${socket.id}`); // Confirma quién deshabilitó el edificio
        } else {
          socket.emit('error-deshabilitando', { mensaje: 'El edificio ya estaba deshabilitado.' });
        }
      } catch (error) {
        socket.emit('error-deshabilitando', { mensaje: 'Error al deshabilitar el edificio.' });
        console.error(`Error al deshabilitar el edificio: ${error}`);  // Muestra errores en la consola del servidor
      }
    });

    socket.on('habilitar-edificio', async ({ edificioId }) => {
      try {
        const resultado = await Edificio.update(
          { Disponibilidad: 'disponible' },
          { where: { EdificioID: edificioId, Disponibilidad: 'no disponible' } }
        );
        if (resultado[0] > 0) {
          io.emit('edificio-habilitado', { edificioId });
          console.log(`Edificio ${edificioId} habilitado por el conserje ${socket.id}`); // Confirma quién habilitó el edificio
        } else {
          socket.emit('error-habilitando', { mensaje: 'El edificio ya estaba habilitado o no se encontró.' });
        }
      } catch (error) {
        socket.emit('error-habilitando', { mensaje: 'Error al habilitar el edificio.' });
        console.error(`Error al habilitar el edificio: ${error}`);  // Muestra errores en la consola del servidor
      }
    });
  });
};