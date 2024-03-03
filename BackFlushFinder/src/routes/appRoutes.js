import { Router } from 'express';
import { obtenerEdificios } from '../controllers/edificiosControllers.js';
import { obtenerConserjes } from '../controllers/conserjesController.js';
import { obtenerBano } from '../controllers/banosController.js';


const router = Router();


router.get('/edificios', obtenerEdificios); // Ruta edificios
router.get('/conserjes', obtenerConserjes); // Ruta conserjes
router.get('/edificios/:edificioId/banos/:banoId', obtenerBano); //Ruta banos por id 


export default router;

