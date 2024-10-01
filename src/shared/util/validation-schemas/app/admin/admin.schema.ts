import * as yup from "yup";
import { emailYupValidation } from "../../../auth.validacion-schema";

export const adminFormSchema = yup.object({
  nombre: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "Min 6 caracteres"),
  email: emailYupValidation,
  direccion: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "Min 6 caracteres"),
  identificacion: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "Min 6 caracteres"),
  telefono: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "Min 6 caracteres"),
  isEditting: yup.boolean().optional(),
  password: yup
    .string()
    .optional()
    .when("isEditting", {
      is: false,
      then: (schema) => schema.required("El campo contraseña es requerido"),
    })
    .when("isEditting", {
      is: false,
      then: (schema) =>
        schema.min(6, "La contraseña debe tener al menos 6 caracteres"),
    }),
});
