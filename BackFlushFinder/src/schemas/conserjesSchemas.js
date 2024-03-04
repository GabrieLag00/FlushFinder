// schemas/conserjesSchemas.js
import { z } from 'zod';

export const LoginConserjeSchema = z.object({
  matricula: z.number({
    required_error: "La matrícula es requerida",
    invalid_type_error: "La matrícula debe ser un número"
  }),
  contrasena: z.string().min(1, "La contraseña es requerida")
});
