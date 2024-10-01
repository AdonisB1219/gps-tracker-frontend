import * as yup from 'yup';


export const gpsFormSchema = yup.object({
    serial: yup.string().required('El campo serial es requerido'),
    lote: yup.string().required('El campo lote es requerido'),
    modelo: yup.string().required('El campo modelo es requerido'),
    bodega: yup.string().required('El campo bodega es requerido'),

  }

);
