import { Router } from "express";
import { loginConserje } from "../controllers/conserjesController.js";


const router = Router();

router.post('/login', loginConserje);


export default router;
