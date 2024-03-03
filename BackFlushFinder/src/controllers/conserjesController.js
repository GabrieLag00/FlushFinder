
import Conserje from '../models/conserje.js'; // Asegúrate de que la ruta sea correcta.

export const obtenerConserjes = async (req, res) => {
  try {
    const conserjes = await Conserje.findAll();
    res.json(conserjes);
  } catch (error) {
    console.error('Error al obtener los conserjes:', error);
    res.status(500).send('Ocurrió un error al obtener los conserjes');
  }
};