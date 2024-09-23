import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CustomTextField } from '../../../../shared/components/ui/CustomTextField';
import { SingleFormBoxScene } from '../../../../shared/components/ui/SingleFormBoxScene';
import { gridSizeMdLg6 } from '../../../../shared/constants';
import { Client } from '../../../../shared/interfaces/app/client.interface';
import { clientFormSchema } from '../../../../shared/util/validation-schemas/app/client/client.schema';
import { CreateClientParams, useCreateClient, useUpdateClient } from '../../../../store/app/client.actions';
import { returnUrlClientsPage } from '../pages/ClientPage/ClientsPage';


export interface SaveClientProps {
    title: string;
    client?: Client;
}

type SaveFormData = CreateClientParams & {};


const SaveClient: React.FC<SaveClientProps> = ({ title, client }) => {
    const navigate = useNavigate();


    ///* form
    const form = useForm<SaveFormData>({
        resolver: yupResolver(clientFormSchema as any),
    });

    const {
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = form;

    ///* mutations
    const createClientMutation = useCreateClient({
        navigate,
        returnUrl: returnUrlClientsPage,
    });
    const updateClientMutation = useUpdateClient({
        navigate,
        returnUrl: returnUrlClientsPage,
    });


    ///* handlers
    const onSave = async (data: SaveFormData) => {

        console.log("onSave -> ",isValid)
        if (!isValid) return;        

        ///* upd
        if (client?.id) {
            updateClientMutation.mutate({ id: client.id, data });
            return;
        }

        ///* create
        createClientMutation.mutate(data);
    };

    ///* effects
    useEffect(() => {
        if (!client?.id) return;
        reset({
            ...client,
            /// client
            email: client?.email,
        });
    }, [client, reset]);

    return (
        <SingleFormBoxScene
            titlePage={title}
            onCancel={() => navigate(returnUrlClientsPage)}
            onSave={handleSubmit(onSave, () => {  })}
        >
<CustomTextField
                label="Nombre"
                name="name"
                type='name'
                control={form.control}
                defaultValue={form.getValues().name}
                error={errors.name}
                helperText={errors.name?.message}
                size={gridSizeMdLg6}
            />

<CustomTextField
                label="Identificacion"
                name="identification"
                type='identification'
                control={form.control}
                defaultValue={form.getValues().identification}
                error={errors.identification}
                helperText={errors.identification?.message}
                size={gridSizeMdLg6}
            />

<CustomTextField
                label="Dirección"
                name="address"
                type='address'
                control={form.control}
                defaultValue={form.getValues().address}
                error={errors.address}
                helperText={errors.address?.message}
                size={gridSizeMdLg6}
            />

<CustomTextField
                label="Teléfono"
                name="phone"
                type='phone'
                control={form.control}
                defaultValue={form.getValues().phone}
                error={errors.phone}
                helperText={errors.phone?.message}
                size={gridSizeMdLg6}
            />
            
            <CustomTextField
                label="Email"
                name="email"
                type='email'
                control={form.control}
                defaultValue={form.getValues().email}
                error={errors.email}
                helperText={errors.email?.message}
                size={gridSizeMdLg6}
            />




            


        </SingleFormBoxScene>
    );
};

export default SaveClient;
