// controllers/conserjesControllers.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { LoginConserjeSchema } from '../schemas/conserjesSchemas.js';
import Conserje from '../models/conserje.js';
import { z } from 'zod';

export const loginConserje = async (req, res) => {
  try {
    // Validar los datos de entrada con Zod
    const datosValidados = LoginConserjeSchema.parse(req.body);

    // Buscar al conserje por matrícula.
    const conserje = await Conserje.findOne({ where: { Matricula: datosValidados.matricula } });

    // Verificar si el conserje existe
    if (!conserje) {
      return res.status(401).json({ message: "Matrícula inválida." });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const contrasenaValida = bcrypt.compareSync(datosValidados.contrasena, conserje.Contrasena);

    if (!contrasenaValida) {
      return res.status(401).json({ message: "Contraseña inválida." });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: conserje.ConserjeID },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Incluir nombre y matrícula en la respuesta
    res.json({
      message: "Login exitoso",
      token,
      conserjeId: conserje.ConserjeID,
      nombre: conserje.Nombre, // Agrega el nombre del conserje a la respuesta
      matricula: conserje.Matricula // Agrega la matrícula del conserje a la respuesta
    });
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


export const obtenerConserjes = async (req, res) => {
  try {
    const conserjes = await Conserje.findAll();
    res.json(conserjes);
  } catch (error) {
    console.error('Error al obtener los conserjes:', error);
    res.status(500).send('Ocurrió un error al obtener los conserjes');
  }
};
