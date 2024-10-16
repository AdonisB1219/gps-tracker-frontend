import * as yup from 'yup';


export const microchipFormSchema = yup.object({
    modelo: yup.string().required('El campo modelo es requerido'),
    operadora: yup.string().required('El campo operadora es requerido'),
    celular: yup.string().required('El campo celular es requerido'),
    saldo: yup.string().required('El campo saldo es requerido'),
    estado: yup.string().required('El campo estado es requerido'),

  }

);
