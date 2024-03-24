import { z } from 'zod';

export const LoginConserjeSchema = z.object({
  matricula: z.number().min(1, { message: "La matrícula debe ser positiva" }),
  contrasena: z.string({ required_error: "La contraseña es requerida" }),
});
