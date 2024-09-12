import * as yup from 'yup';
import { emailYupValidation } from '../../../auth.validacion-schema';


export const userFormSchema = yup.object({
    nombre: yup.string().required('El campo nombre es requerido'),
    direccion: yup.string().required('El campo direccion es requerido'),
    telefono: yup.string().required('El campo telefono es requerido'),
    correo: emailYupValidation,
    provincia: yup.string().required('El campo provincia es requerido'),
    ciudad: yup.string().required('El campo ciudad es requerido'),
    password: yup.string().required('El campo password es requerido'),
    instagram: yup.string().required('El campo instagram es requerido'),
    x: yup.string().required('El campo x es requerido'),
  }

);
