import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomTextField } from "../../../../shared/components/ui/CustomTextField";
import { SingleFormBoxScene } from "../../../../shared/components/ui/SingleFormBoxScene";
import { gridSizeMdLg6 } from "../../../../shared/constants";
import {
  CreateMicrochipParams,
  useCreateMicrochip,
  useUpdateMicrochip,
} from "../../../../store/app/microchip.actions";
import { Microchip } from "../../../../shared/interfaces/app/microchip.interface";
import { microchipFormSchema } from "../../../../shared/util/validation-schemas/app/microchip/microchip.schema";
import CustomAutocompleteArrString from "../../../../shared/components/ui/CustomAutocomplete/CustomAutocompleteArrString";

export interface SaveMicrochipProps {
  title: string;
  Microchip?: Microchip;
}

type SaveFormData = CreateMicrochipParams & {};

const SaveMicrochip: React.FC<SaveMicrochipProps> = ({ title, Microchip }) => {
  const navigate = useNavigate();

  const returnUrlMicrochipsPage = "/dashboard/mantenimiento/microchips";

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(microchipFormSchema as any),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createMicrochipMutation = useCreateMicrochip({
    navigate,
    returnUrl: returnUrlMicrochipsPage,
  });
  const updateMicrochipMutation = useUpdateMicrochip({
    navigate,
    returnUrl: returnUrlMicrochipsPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (Microchip?.id) {
      updateMicrochipMutation.mutate({ id: Microchip.id, data });
      return;
    }

    ///* create
    createMicrochipMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!Microchip?.id) return;
    reset({
      ...Microchip,
      /// Microchip
    });
  }, [Microchip, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlMicrochipsPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Celular"
        name="celular"
        type="text"
        control={form.control}
        defaultValue={form.getValues().celular}
        error={errors.celular}
        helperText={errors.celular?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="Modelo"
        name="modelo"
        type="text"
        control={form.control}
        defaultValue={form.getValues().modelo}
        error={errors.modelo}
        helperText={errors.modelo?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="Operadora"
        name="operadora"
        type="text"
        control={form.control}
        defaultValue={form.getValues().operadora}
        error={errors.operadora}
        helperText={errors.operadora?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="Saldo"
        name="saldo"
        type="number"
        control={form.control}
        defaultValue={form.getValues().saldo}
        error={errors.saldo}
        helperText={errors.saldo?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocompleteArrString
        label="Estado"
        name="estado"
        options={["ACTIVO", "INACTIVO"]}
        control={form.control}
        defaultValue={form.getValues().estado}
        error={errors.estado}
        helperText={"Introduce un estado"}
        isLoadingData={false}
        size={gridSizeMdLg6}
        disableClearable
      />

    </SingleFormBoxScene>
  );
};

export default SaveMicrochip;
