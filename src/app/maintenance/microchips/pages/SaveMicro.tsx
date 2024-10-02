import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CustomTextField } from '../../../../shared/components/ui/CustomTextField';
import { SingleFormBoxScene } from '../../../../shared/components/ui/SingleFormBoxScene';
import {  gridSizeMdLg6 } from '../../../../shared/constants';
import { Gps } from '../../../../shared/interfaces/app/gps.interface';
import { gpsFormSchema } from '../../../../shared/util/validation-schemas/app/gps/gps.schema';
import { CreateGpsParams, useCreateGps, useUpdateGps } from '../../../../store/app/gps.actions';



export interface SaveGpsProps {
    title: string;
    gps?: Gps;
}

type SaveFormData = CreateGpsParams & {};


const SaveMicro: React.FC<SaveGpsProps> = ({ title, gps }) => {
    const navigate = useNavigate();

    const returnUrlGpssPage = '/dashboard/mantenimiento/gps';

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
        });
    }, [gps, reset]);

    return (
        <SingleFormBoxScene
            titlePage={title}
            onCancel={() => navigate(returnUrlGpssPage)}
            onSave={handleSubmit(onSave, () => {  })}
            customTextBtn='Verificar GPS'
        >
            <CustomTextField
                label="Modelo"
                name="client"
                type='text'
                control={form.control}
                defaultValue={form.getValues().bodega}
                error={errors.bodega}
                helperText={errors.bodega?.message}
                size={gridSizeMdLg6}
            />


            



        </SingleFormBoxScene>
    );
};

export default SaveMicro;
