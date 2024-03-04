import { Router } from "express";
import { loginConserje } from "../controllers/conserjesController";


const router = Router();

router.post('/login', loginConserje);


export default router;
