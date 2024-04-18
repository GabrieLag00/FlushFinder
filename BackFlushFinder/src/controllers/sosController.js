import SosReport from '../models/sosreport.js';

export const obtenerSos = async (req, res) => {
  try {
    const sos = await SosReport.findAll();
    res.json(sos);
  } catch (error) {
    console.error('Error al obtener los SOS:', error);
    res.status(500).send('Ocurrió un error al obtener los SOS');
  }
};

// Controlador para borrar un SOS
export const borrarSos = async (req, res) => {
  try {
    const { id } = req.params;
    const sos = await SosReport.findByPk(id);
    if (!sos) {
      return res.status(404).send('El reporte SOS no existe');
    }
    await sos.destroy();
    res.send('Reporte SOS eliminado con éxito');
  } catch (error) {
    console.error('Error al borrar el SOS:', error);
    res.status(500).send('Ocurrió un error al borrar el SOS');
  }
};

// Controlador para borrar todos los SOS
export const borrarTodosSos = async (req, res) => {
  try {
    await SosReport.destroy({
      where: {},
      truncate: false // Establece esto como true si quieres truncar la tabla completamente
    });
    res.send('Todos los reportes SOS han sido eliminados con éxito');
  } catch (error) {
    console.error('Error al borrar todos los reportes SOS:', error);
    res.status(500).send('Ocurrió un error al borrar todos los reportes SOS');
  }
};