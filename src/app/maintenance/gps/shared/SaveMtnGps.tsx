/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomTextField } from "../../../../shared/components/ui/CustomTextField";
import { SingleFormBoxScene } from "../../../../shared/components/ui/SingleFormBoxScene";
import { gridSizeMdLg6 } from "../../../../shared/constants";
import { Gps } from "../../../../shared/interfaces/app/gps.interface";
import { gpsFormSchema } from "../../../../shared/util/validation-schemas/app/gps/gps.schema";
import {
  CreateGpsParams,
  useCreateGps,
  useUpdateGps,
} from "../../../../store/app/gps.actions";
import { returnUrlGpsPage } from "../pages/GpsPage/GpsPage";

export interface SaveGpsProps {
  title: string;
  gps?: Gps;
}

type SaveFormData = CreateGpsParams & {};

const SaveMtoGps: React.FC<SaveGpsProps> = ({ title, gps }) => {
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
    returnUrl: returnUrlGpsPage,
  });
  const updateGpsMutation = useUpdateGps({
    navigate,
    returnUrl: returnUrlGpsPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
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
      onCancel={() => navigate(returnUrlGpsPage)}
      onSave={handleSubmit(onSave, (err) => {console.log(err)})}
    >
      <CustomTextField
        label="Modelo"
        name="modelo"
        type="text"
        control={form.control}
        defaultValue={form.getValues().modelo}
        error={errors.modelo}
        helperText={"Ingresa un modelo"}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Serial"
        name="serial"
        type="text"
        control={form.control}
        defaultValue={form.getValues().serial}
        error={errors.serial}
        helperText={errors.serial?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Lote"
        name="lote"
        type="text"
        control={form.control}
        defaultValue={form.getValues().lote}
        error={errors.lote}
        helperText={errors.lote?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Bodega"
        name="bodega"
        type="text"
        control={form.control}
        defaultValue={form.getValues().bodega}
        error={errors.bodega}
        helperText={errors.bodega?.message}
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveMtoGps;
