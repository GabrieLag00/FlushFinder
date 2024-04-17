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