import { z } from 'zod';

export const RegistroSchema = z.object({
  nombre: z.string()
    .min(1, { message: "El nombre es requerido" })
    .max(100, { message: "El nombre no debe exceder los 100 caracteres" }),
  email: z.string()
    .email({ message: "Correo electrónico no válido" })
    .max(255, { message: "El correo electrónico no debe exceder los 255 caracteres" }),
  contrasena: z.string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(50, { message: "La contraseña no debe exceder los 50 caracteres" })
    .regex(/[a-zA-Z]/, { message: "La contraseña debe contener al menos una letra" })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número" })
    .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial" }),
  genero: z.enum(['M', 'F'], 'El género es requerido'),
});


export const LoginSchema = z.object({
    email: z.string()
      .email({ message: "Correo electrónico no válido" })
      .max(255, { message: "El correo electrónico no debe exceder los 255 caracteres" }),
    contrasena: z.string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .max(50, { message: "La contraseña no debe exceder los 50 caracteres" }),
  });
  