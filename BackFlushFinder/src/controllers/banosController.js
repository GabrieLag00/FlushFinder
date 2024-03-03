import Bano from '../models/bano.js';

export const obtenerBano = async (req, res) => {
    const { edificioId, banoId } = req.params; 

    try {
        let queryOptions = {
            where: { EdificioID: edificioId }
        };

      
        if (banoId) {
            queryOptions.where.BanoID = banoId;
        }

        const banos = await Bano.findAll(queryOptions);

      
        if (banoId && banos.length === 0) {
            return res.status(404).send('Baño no encontrado');
        }

        res.json(banos);
    } catch (error) {
        console.error('Error al obtener los baños:', error);
        res.status(500).send('Ocurrió un error al obtener los baños');
    }
}
