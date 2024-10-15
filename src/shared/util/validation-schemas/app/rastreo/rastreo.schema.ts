import * as yup from 'yup';

export const rastreoFormSchema = yup.object({
    serial: yup.string().required('El campo nombre es requerido'),
    cliente: yup.string().required('El campo cliente es requerido'),
    referencia: yup.string().required('El campo referencia es requerido'),
    estado: yup.string().required('El campo estado es requerido'),
    celular: yup.string().required('El campo celular es requerido'),
    saldo: yup.number().required('El campo saldo es requerido'),
    fechaInicio: yup.string().required('El campo fecha inicio es requerido'),
    fechaFin: yup.string().required('El campo fecha fin es requerido'),

  })
