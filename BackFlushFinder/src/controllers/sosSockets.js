// controllers/sosSockets.js
import SosReport from '../models/sosreport.js';

export const habilitarManejoSosReports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    // Manejo del evento para enviar un SOS
    socket.on('enviar-sos', async (datosSos) => {
      try {
        // Crear el reporte SOS en la base de datos
        const nuevoSosReport = await SosReport.create({
          UsuarioID: datosSos.UsuarioID,
          Nombre: datosSos.Nombre,
          Email: datosSos.Email,
          BanoID: datosSos.BanoID,
          Problema: datosSos.Problema,
          RatingLimpieza: datosSos.RatingLimpieza,
          Papel: datosSos.Papel,
          Jabon: datosSos.Jabon,
          Comentarios: datosSos.Comentarios,
          // FechaHora se establece automáticamente a NOW por el modelo
        });

        // Emitir un evento a los conserjes con el reporte SOS
        io.emit('reporte-sos-nuevo', nuevoSosReport.toJSON());

        console.log(`Reporte SOS recibido y enviado al conserje: ${JSON.stringify(nuevoSosReport)}`);
      } catch (error) {
        console.error('Error al guardar el reporte SOS:', error);
        socket.emit('error-sos', { mensaje: 'Error al enviar el reporte SOS.' });
      }
    });
  });
};

export default habilitarManejoSosReports;
