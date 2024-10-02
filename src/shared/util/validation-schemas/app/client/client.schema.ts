import * as yup from 'yup';
import { emailYupValidation } from '../../../auth.validacion-schema';


export const clientFormSchema = yup.object({
    nombre: yup.string().required('El campo nombre es requerido'),
    apellidos: yup.string().required('El campo apellidos es requerido'),
    provincia: yup.string().required('El campo provincia es requerido'),
    ciudad: yup.string().required('El campo ciudad es requerido'),
    instagram: yup.string().required('El campo instagram es requerido'),
    x: yup.string().required('El campo x es requerido'),
    cedula: yup.string().required('El campo cedula es requerido'),
    ruc: yup.string().required('El campo ruc es requerido'),
    razonSocial: yup.string().required('El campo razonSocial es requerido'),
    email: emailYupValidation,
  }

);
