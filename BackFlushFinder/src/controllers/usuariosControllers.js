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
      contrasena: contrasenaHash,
      genero: datosValidados.genero,
    });

    // Generar el token para el nuevo usuario
    const token = jwt.sign({ id: nuevoUsuario.usuarioID }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Opcional: Excluir la contraseña del objeto de respuesta
    const usuarioParaRespuesta = {
      usuarioID: nuevoUsuario.usuarioID,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      genero: nuevoUsuario.genero,
    };

    // Responder con éxito, incluyendo el token y los datos del usuario en la respuesta
    res.status(201).json({
      message: "Usuario registrado con éxito",
      token, // Incluye el token en la respuesta
      usuario: usuarioParaRespuesta,
    });
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
    
    if (!usuario) {
      return res.status(404).json({ message: "Correo electrónico no existe, por favor regístrate." });
    }

    // Verificar si el usuario existe y la contraseña es correcta
    if (!usuario || !bcrypt.compareSync(datosValidados.contrasena, usuario.contrasena)) {
      return res.status(401).json({ message: "Contraseña Incorrecta" });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: usuario.id }, // Payload del token
      process.env.JWT_SECRET, // Clave secreta para firmar el token
      { expiresIn: '24h' } // Opciones del token
    );

    // Incluir el nombre y email en la respuesta
    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario.usuarioID,
        nombre: usuario.nombre,
        email: usuario.email,
        genero: usuario.genero
      }
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


  export const obtenerDatosUsuario = async (req, res) => {
    try {
      // Asumiendo que el ID del usuario viene en la ruta o en un token JWT
      const usuarioId = req.params.id || req.usuario.id;
  
      // Buscar al usuario por ID
      const usuario = await Usuario.findByPk(usuarioId, {
        attributes: { exclude: ['contrasena'] } // Excluir la contraseña del resultado
      });
  
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }
  
      res.json({ usuario });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los datos del usuario" });
    }
  };