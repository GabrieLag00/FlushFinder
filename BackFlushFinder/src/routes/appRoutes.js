import { Router } from 'express';
import { obtenerEdificios } from '../controllers/edificiosControllers.js';
import { obtenerBano } from '../controllers/banosController.js';
import { obtenerConserjes } from '../controllers/conserjesController.js';




const router = Router();

router.get('/edificios', obtenerEdificios); // Ruta edificios 
router.get('/edificios/:edificioId/banos/:banoId', obtenerBano); //Ruta banos por id 
router.get('/conserjes', obtenerConserjes); 


export default router;


