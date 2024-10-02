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
    console.log("onSave -> ", isValid);
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
        label="instagram"
        name="instagram"
        type="text"
        control={form.control}
        defaultValue={form.getValues().instagram}
        error={errors.instagram}
        helperText={errors.instagram?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="x"
        name="x"
        type="text"
        control={form.control}
        defaultValue={form.getValues().x}
        error={errors.x}
        helperText={errors.x?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="cedula"
        name="cedula"
        type="text"
        control={form.control}
        defaultValue={form.getValues().cedula}
        error={errors.cedula}
        helperText={errors.cedula?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="ruc"
        name="ruc"
        type="text"
        control={form.control}
        defaultValue={form.getValues().ruc}
        error={errors.ruc}
        helperText={errors.ruc?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="Razon Social"
        name="razonSocial"
        type="text"
        control={form.control}
        defaultValue={form.getValues().razon_social}
        error={errors.razon_social}
        helperText={errors.razon_social?.message}
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveClient;
