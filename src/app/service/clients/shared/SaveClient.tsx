import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomTextField } from "../../../../shared/components/ui/CustomTextField";
import { SingleFormBoxScene } from "../../../../shared/components/ui/SingleFormBoxScene";
import { gridSizeMdLg6 } from "../../../../shared/constants";
import { Client } from "../../../../shared/interfaces/app/client.interface";
import { clientFormSchema } from "../../../../shared/util/validation-schemas/app/client/client.schema";
import {
  CreateClientParams,
  useCreateClient,
  useUpdateClient,
} from "../../../../store/app/client.actions";
import { returnUrlClientsPage } from "../pages/ClientPage/ClientsPage";

export interface SaveClientProps {
  title: string;
  client?: Client;
}

type SaveFormData = CreateClientParams;

const SaveClient: React.FC<SaveClientProps> = ({ title, client }) => {
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(clientFormSchema),
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
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Nombre"
        name="nombre"
        type="text"
        control={form.control}
        defaultValue={form.getValues().nombre}
        error={errors.nombre}
        helperText={errors.nombre?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="apellidos"
        name="apellidos"
        type="text"
        control={form.control}
        defaultValue={form.getValues().apellidos}
        error={errors.apellidos}
        helperText={errors.apellidos?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="provincia"
        name="provincia"
        type="text"
        control={form.control}
        defaultValue={form.getValues().provincia}
        error={errors.provincia}
        helperText={errors.provincia?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="ciudad"
        name="ciudad"
        type="text"
        control={form.control}
        defaultValue={form.getValues().ciudad}
        error={errors.ciudad}
        helperText={errors.ciudad?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Email"
        name="email"
        type="email"
        control={form.control}
        defaultValue={form.getValues().email}
        error={errors.email}
        helperText={errors.email?.message}
        size={gridSizeMdLg6}
      />
  
     
      <CustomTextField
        label="identificacion"
        name="identificacion"
        type="text"
        control={form.control}
        defaultValue={form.getValues().identificacion}
        error={errors.identificacion}
        helperText={errors.identificacion?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Dirección"
        name="direccion"
        type="text"
        control={form.control}
        defaultValue={form.getValues().direccion}
        error={errors.direccion}
        helperText={errors.direccion?.message}
        size={gridSizeMdLg6}
      />
   
    </SingleFormBoxScene>
  );
};

export default SaveClient;
