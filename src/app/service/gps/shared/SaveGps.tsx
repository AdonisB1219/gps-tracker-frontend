import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { CustomTextField } from '../../../../shared/components/ui/CustomTextField';
import { SampleDatePicker } from '../../../../shared/components/ui/SampleDatePicker';
import { SingleFormBoxScene } from '../../../../shared/components/ui/SingleFormBoxScene';
import { gridSizeMdLg6 } from '../../../../shared/constants';
import { Gps } from '../../../../shared/interfaces/app/gps.interface';
import { gpsFormSchema } from '../../../../shared/util/validation-schemas/app/gps/gps.schema';
import { CreateGpsParams, useCreateGps, useUpdateGps } from '../../../../store/app/gps.actions';
import { returnUrlGpssPage } from '../pages/GpsPage.tsx/GpsPage';



export interface SaveGpsProps {
    title: string;
    gps?: Gps;
}

type SaveFormData = CreateGpsParams & {};


const SaveGps: React.FC<SaveGpsProps> = ({ title, gps }) => {
    const navigate = useNavigate();


    ///* form
    const form = useForm<SaveFormData>({
        resolver: yupResolver(gpsFormSchema as any),
    });

    const {
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = form;

    ///* mutations
    const createGpsMutation = useCreateGps({
        navigate,
        returnUrl: returnUrlGpssPage,
    });
    const updateGpsMutation = useUpdateGps({
        navigate,
        returnUrl: returnUrlGpssPage,
    });


    ///* handlers
    const onSave = async (data: SaveFormData) => {

        data.start_date = dayjs(data.start_date).format(
            'YYYY-MM-DDTHH:mm:ss[Z]'
          );

        console.log("onSave -> ",isValid)
        if (!isValid) return;        

        ///* upd
        if (gps?.id) {
            updateGpsMutation.mutate({ id: gps.id, data });
            return;
        }

        ///* create
        createGpsMutation.mutate(data);
    };

    ///* effects
    useEffect(() => {
        if (!gps?.id) return;
        reset({
            ...gps,
            /// gps
            reference: gps?.reference,
        });
    }, [gps, reset]);

    return (
        <SingleFormBoxScene
            titlePage={title}
            onCancel={() => navigate(returnUrlGpssPage)}
            onSave={handleSubmit(onSave, () => {  })}
        >
            <CustomTextField
                label="Reference"
                name="reference"
                type='text'
                control={form.control}
                defaultValue={form.getValues().reference}
                error={errors.reference}
                helperText={errors.reference?.message}
                size={gridSizeMdLg6}
            />

<CustomTextField
                label="Cliente"
                name="client"
                type='text'
                control={form.control}
                defaultValue={form.getValues().client?.email}
                error={errors.client?.email}
                helperText={errors.client?.message}
                size={gridSizeMdLg6}
            />

<SampleDatePicker
          label="Fecha de Inicio"
          name="start_date"
          control={form.control}
          defaultValue={form.getValues().start_date}
          error={errors.start_date}
          helperText={errors.start_date?.message}
          size={gridSizeMdLg6}
          disabled={false}
        />

<SampleDatePicker
          label="Fecha de Fin"
          name="end_date"
          control={form.control}
          defaultValue={form.getValues().end_date}
          error={errors.end_date}
          helperText={errors.end_date?.message}
          size={gridSizeMdLg6}
          disabled={false}
        />
        
        

<CustomTextField
                label="Saldo"
                name="credit"
                type='text'
                control={form.control}
                defaultValue={form.getValues().credit}
                error={errors.credit}
                helperText={errors.credit?.message}
                size={gridSizeMdLg6}
            />

            
<CustomTextField
                label="Celular"
                name="phone"
                type='text'
                control={form.control}
                defaultValue={form.getValues().phone}
                error={errors.phone}
                helperText={errors.phone?.message}
                size={gridSizeMdLg6}
            />

            



        </SingleFormBoxScene>
    );
};

export default SaveGps;
