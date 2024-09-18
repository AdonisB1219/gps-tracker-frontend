import * as yup from 'yup';
import { emailYupValidation } from '../../../auth.validacion-schema';


export const adminFormSchema = yup.object({
    email: emailYupValidation,

    isEditting: yup.boolean().optional(),
    password: yup
      .string()
      .optional()
      .when('isEditting', {
        is: false,
        then: schema => schema.required('El campo contraseña es requerido'),
      })
      .when('isEditting', {
        is: false,
        then: schema =>
          schema.min(6, 'La contraseña debe tener al menos 6 caracteres'),
      }),  }

);
