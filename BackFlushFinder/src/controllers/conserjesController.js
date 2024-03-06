// controllers/conserjesControllers.js
import jwt from 'jsonwebtoken';
import { LoginConserjeSchema } from '../schemas/conserjesSchemas.js';
import Conserje from '../models/conserje.js';
import { z } from 'zod';

export const loginConserje = async (req) => {
  try {
    // Validar los datos de entrada con Zod
    const datosValidados = LoginConserjeSchema.parse(req.body);

    // Buscar al conserje por matrícula
    const conserje = await Conserje.findOne({ where: { matricula: datosValidados.matricula } });

    // Verificar si el conserje existe
    if (!conserje) {
      return res.status(401).json({ message: "Matrícula inválida." });
    }

    // Aquí asumimos que la contraseña es igual a la matrícula, por lo que ya ha sido "validada"
    // Sin embargo, esta práctica no es recomendable para la seguridad

    // Generar el token JWT
    const token = jwt.sign(
      { id: conserje.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ message: "Login exitoso", token, conserjeId: conserje.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Manejar errores de validación de Zod
      return res.status(400).json({ errors: error.errors });
    }
    // Manejar otros errores
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
