import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { userFormSchema } from '../../../shared/util/validation-schemas/app/user/user.schema';
import { User } from '../../../shared/interfaces/app/user.interface';
import { CreateUserParams } from '../../../store/app/users.actions';
import { returnUrlUsersPage } from '../pages/UsersPage/UsersPage';
import { SingleFormBoxScene } from '../../../shared/components/ui/SingleFormBoxScene';
import { CustomTextField } from '../../../shared/components/ui/CustomTextField';
import { CustomCellphoneTextField } from '../../../shared/components/ui/CustomCellphoneTextField';
import { gridSizeMdLg6 } from '../../../shared/constants/grid-size.constants';

export interface SaveUserProps {
    title: string;
    user?: User;
}

type SaveFormData = CreateUserParams & {};


const SaveUser: React.FC<SaveUserProps> = ({ title, user }) => {
    const navigate = useNavigate();

    ///* form
    const form = useForm<SaveFormData>({
        resolver: yupResolver(userFormSchema as any),
    });

    const {
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = form;


    ///* handlers
    const onSave = async () => {
        if (!isValid) return;        

        ///* upd
        if (user?.id) {
            console.log("update");
            return;
        }

        ///* create
        console.log("create");
    };

    ///* effects
    useEffect(() => {
        if (!user?.id) return;
        reset({
            ...user,
            /// user
            nombre: user?.nombre,
            direccion: user?.direccion,
            telefono: user?.telefono,
            correo: user?.correo,
        });
    }, [user, reset]);

    return (
        <SingleFormBoxScene
            titlePage={title}
            onCancel={() => navigate(returnUrlUsersPage)}
            onSave={handleSubmit(onSave, () => { })}
        >
            <CustomTextField
                label="Nombre"
                name="nombre"
                control={form.control}
                defaultValue={form.getValues().nombre}
                error={errors.nombre}
                helperText={errors.nombre?.message}
                size={gridSizeMdLg6}
            />


            <CustomTextField
                label="Direccion"
                name="direccion"
                control={form.control}
                defaultValue={form.getValues().direccion}
                error={errors.direccion}
                helperText={errors.direccion?.message}
                size={gridSizeMdLg6}
            />

            <CustomCellphoneTextField
                label="Telefono"
                name="telefono"
                control={form.control}
                defaultValue={form.getValues().telefono}
                error={errors.telefono}
                helperText={errors.telefono?.message}
                size={gridSizeMdLg6}
            />

            <CustomTextField
                label="Correo"
                name="correo"
                type="correo"
                control={form.control}
                defaultValue={form.getValues().correo}
                error={errors.correo}
                helperText={errors.correo?.message}
                size={gridSizeMdLg6}
            />

        </SingleFormBoxScene>
    );
};

export default SaveUser;
