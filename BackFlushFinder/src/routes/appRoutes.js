import {Router} from 'express';
import { obtenerEdificios } from '../controllers/edificiosControllers.js';



// Crear el router de Express
const router = Router();

// Ruta de registro
router.get('/getEdificios', obtenerEdificios);


// Exportar el router
export default router;
