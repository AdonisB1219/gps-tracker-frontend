import * as yup from 'yup';


export const gpsFormSchema = yup.object({
    reference: yup.string().required('El campo nombre es requerido'),
    cliente: yup.string().required('El campo direccion es requerido'),
  }

);
