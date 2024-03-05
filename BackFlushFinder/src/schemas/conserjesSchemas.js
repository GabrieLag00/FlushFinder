import { z } from 'zod';

export const LoginConserjeSchema = z.object({
  matricula: z.number().min(1, "La matrícula es requerida"),
  nombre: z.string().min(1, "El nombre es requerido")
});
