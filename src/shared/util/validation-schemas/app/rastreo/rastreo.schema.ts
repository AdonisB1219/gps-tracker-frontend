import * as yup from 'yup';

export const rastreoFormSchema = yup.object({
    serial: yup.string().required('El campo nombre es requerido'),
    cliente: yup.string().required('El campo cliente es requerido'),
    referencia: yup.string().required('El campo referencia es requerido'),
    celular: yup.string().required('El campo celular es requerido'),
    saldo: yup.string().required('El campo saldo es requerido'),
    fecha_inicio: yup.string().required('El campo fecha_inicio es requerido'),
    fecha_fin: yup.string().required('El campo fecha_fin es requerido'),

  })
