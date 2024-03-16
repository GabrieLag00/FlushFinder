// Importar las dependencias necesarias
import bcrypt from 'bcryptjs';
import { RegistroSchema, LoginSchema } from '../schemas/usuariosSchemas.js'; // Asegúrate de que la ruta sea correcta
import Usuario from '../models/usuario.js'; // Asume que este es tu modelo Sequelize para usuarios
import jwt from 'jsonwebtoken';
import { z } from 'zod';


// Controlador de registro de usuario
export const registrarUsuario = async (req, res) => {
  try {
    // Validar los datos de entrada con Zod
    const datosValidados = RegistroSchema.parse(req.body);

    // Verificar si el usuario ya existe por correo electrónico
    const usuarioExistente = await Usuario.findOne({ where: { email: datosValidados.email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El correo electrónico ya está registrado." });
    }

    // Hashing de la contraseña
    const contrasenaHash = bcrypt.hashSync(datosValidados.contrasena, 10);

    // Crear el nuevo usuario en la base de datos
    const nuevoUsuario = await Usuario.create({
      nombre: datosValidados.nombre,
      email: datosValidados.email,
      contrasena: contrasenaHash, // Guardar la contraseña hasheada
      genero: datosValidados.genero,
    });

    // Opcional: Eliminar la contraseña del objeto antes de devolverlo
    const usuarioParaRespuesta = { ...nuevoUsuario.toJSON() };
    delete usuarioParaRespuesta.contrasena;

    // Responder con éxito
    res.status(201).json({ message: "Usuario registrado con éxito", usuario: usuarioParaRespuesta });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Manejar errores de validación de Zod
      return res.status(400).json({ errors: error.errors });
    }
    // Manejar otros errores (por ejemplo, errores de base de datos)
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

// Controlador de login de usuario
export const loginUsuario = async (req, res) => {
    try {
      // Validar los datos de entrada con Zod
      const datosValidados = LoginSchema.parse(req.body);
  
      // Buscar al usuario por email
      const usuario = await Usuario.findOne({ where: { email: datosValidados.email } });
      
      // Verificar si el usuario existe y la contraseña es correcta
      if (!usuario || !bcrypt.compareSync(datosValidados.contrasena, usuario.contrasena)) {
        return res.status(401).json({ message: "Correo electrónico o contraseña inválidos." });
      }
  
      // Generar el token JWT
      const token = jwt.sign(
        { id: usuario.id }, // Payload del token
        process.env.JWT_SECRET, // Clave secreta para firmar el token
        { expiresIn: '24h' } // Opciones del token
      );
  
      res.json({ message: "Login exitoso", token, usuarioId: usuario.id });
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
