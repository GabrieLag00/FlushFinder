import { Router } from 'express';
import { obtenerEdificios } from '../controllers/edificiosControllers.js';
import { obtenerBano } from '../controllers/banosController.js';
import { loginConserje } from '../controllers/conserjesController.js';


const router = Router();


router.get('/edificios', obtenerEdificios); // Ruta edificios 
router.post('/login', loginConserje); // Ruta conserjes
router.get('/edificios/:edificioId/banos/:banoId', obtenerBano); //Ruta banos por id 


export default router;

