import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Admin } from '../../../shared/interfaces/app/admin.interface';
import { CreateAdminParams, useCreateAdmin, useUpdateAdmin } from '../../../store/app/admin.actions';
import { returnUrlUsersPage } from '../pages/UsersPage/UsersPage';
import { SingleFormBoxScene } from '../../../shared/components/ui/SingleFormBoxScene';
import { CustomTextField } from '../../../shared/components/ui/CustomTextField';
import { gridSizeMdLg6 } from '../../../shared/constants/grid-size.constants';
import { adminFormSchema } from '../../../shared/util/validation-schemas/app/admin/admin.schema';
import { IconButton, InputAdornment } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

export interface SaveAdminProps {
    title: string;
    admin?: Admin;
}

type SaveFormData = CreateAdminParams & {};


const SaveAdmin: React.FC<SaveAdminProps> = ({ title, admin }) => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    ///* form
    const form = useForm<SaveFormData>({
        resolver: yupResolver(adminFormSchema as any),
    });

    const {
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = form;

    ///* mutations
    const createAdminMutation = useCreateAdmin({
        navigate,
        returnUrl: returnUrlUsersPage,
    });
    const updateAdminMutation = useUpdateAdmin({
        navigate,
        returnUrl: returnUrlUsersPage,
    });


    ///* handlers
    const onSave = async (data: SaveFormData) => {

        console.log("onSave -> ",isValid)
        if (!isValid) return;        

        ///* upd
        if (admin?.id) {
            updateAdminMutation.mutate({ id: admin.id, data });
            return;
        }

        ///* create
        createAdminMutation.mutate(data);
    };

    ///* effects
    useEffect(() => {
        if (!admin?.id) return;
        reset({
            ...admin,
            /// admin
            email: admin?.email,
        });
    }, [admin, reset]);

    return (
        <SingleFormBoxScene
            titlePage={title}
            onCancel={() => navigate(returnUrlUsersPage)}
            onSave={handleSubmit(onSave, () => {  })}
        >
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


            
      <CustomTextField
        label="Contraseña"
        name="password"
        overrideAsPassword // avoid uppercase in text mode
        control={form.control}
        defaultValue={form.getValues().password}
        error={form.formState.errors.password}
        helperText={form.formState.errors.password?.message}
        type={showPassword ? 'text' : 'password'}
        endAdornmentInput={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </IconButton>
          </InputAdornment>
        }
        size={gridSizeMdLg6}
      />


        </SingleFormBoxScene>
    );
};

export default SaveAdmin;
