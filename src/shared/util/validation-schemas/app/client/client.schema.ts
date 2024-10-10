import * as yup from 'yup';
import { emailYupValidation } from '../../../auth.validacion-schema';


export const clientFormSchema = yup.object({
  apellidos: yup.string().required("El campo apellidos es requerido"),
  identificacion: yup
    .string()
    .required("El campo identificacion es requerido")
    .max(13, "El campo identificacion debe tener 13 caracteres como máximo"),
  ciudad: yup.string().required("El campo ciudad es requerido"),
  direccion: yup.string().required("El campo direccion es requerido"),
  email: emailYupValidation,
  nombre: yup.string().required("El campo nombre es requerido"),
  provincia: yup.string().required("El campo provincia es requerido"),
});
