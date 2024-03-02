// controllers/edificiosController.js
import Edificio from '../models/edificios.js'; // Asegúrate de que la ruta sea correcta.

export const obtenerEdificios = async (req, res) => {
  try {
    const edificios = await Edificio.findAll();
    res.json(edificios);
  } catch (error) {
    console.error('Error al obtener los edificios:', error);
    res.status(500).send('Ocurrió un error al obtener los edificios');
  }
};
