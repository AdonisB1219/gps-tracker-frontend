import * as yup from 'yup';
import { emailYupValidation } from '../../../auth.validacion-schema';


export const clientFormSchema = yup.object({
    nombre: yup.string().required('El campo nombre es requerido'),
    direccion: yup.string().required('El campo direccion es requerido'),
    telefono: yup.string().required('El campo telefono es requerido'),
    correo: emailYupValidation,
  }

);
