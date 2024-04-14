// Importamos Edificio desde el modelo
import Edificio from '../models/edificios.js';

// Modificamos la función para aceptar `io` como argumento
export const habilitarManejoEdificios = (io) => {
    io.on('connection', (socket) => {
      console.log(`Conserje conectado: ${socket.id}`);
  
      socket.on('deshabilitar-edificio', async ({ edificioId }) => {
        try {
          // Actualizar la disponibilidad del edificio en la base de datos
          await Edificio.update({ Disponibilidad: 'no disponible' }, { where: { EdificioID: edificioId } });
  
          // Emitir un evento a todos los clientes para informarles que el edificio ha sido deshabilitado
          io.emit('edificio-deshabilitado', { edificioId });
  
          console.log(`Edificio ${edificioId} deshabilitado por el conserje ${socket.id}`);
        } catch (error) {
          console.error('Error al deshabilitar el edificio:', error);
          // Opcional: Emitir un evento al conserje para informarle del error
          socket.emit('error-deshabilitando', { mensaje: 'Error al deshabilitar el edificio.' });
        }
      });
        // Nuevo evento para re-habilitar el edificio
        socket.on('habilitar-edificio', async ({ edificioId }) => {
          try {
              await Edificio.update({ Disponibilidad: 'disponible' }, { where: { EdificioID: edificioId } });
              io.emit('edificio-habilitado', { edificioId });
              console.log(`Edificio ${edificioId} habilitado por el conserje ${socket.id}`);
          } catch (error) {
              console.error('Error al habilitar el edificio:', error);
              socket.emit('error-habilitando', { mensaje: 'Error al habilitar el edificio.' });
          }
        });      
    });
};
