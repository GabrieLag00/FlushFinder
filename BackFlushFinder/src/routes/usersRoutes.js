// Importar Express y los controladores
import {Router} from 'express';
import { registrarUsuario, loginUsuario, obtenerDatosUsuario } from '../controllers/usuariosControllers.js';

// Crear el router de Express
const router = Router();

// Ruta de registro
router.post('/register', registrarUsuario);

// Ruta de login
router.post('/login', loginUsuario);

router.get('/datos/:id', obtenerDatosUsuario);

// Exportar el router
export default router;
