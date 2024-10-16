import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { CustomTextField } from "../../../../shared/components/ui/CustomTextField";
import { SampleDatePicker } from "../../../../shared/components/ui/SampleDatePicker";
import { SingleFormBoxScene } from "../../../../shared/components/ui/SingleFormBoxScene";
import { gridSizeMdLg6 } from "../../../../shared/constants";
import { useFetchGpss } from "../../../../store/app/gps.actions";
import { returnUrlGpssPage } from "../pages/RastreoPage/RastreoPage";
import { Rastreo } from "../../../../shared/interfaces/app/rastreo.interface";
import { CustomAutocompleteArrString } from "../../../../shared/components/ui/CustomAutocomplete";
import {
  CreateRastreoParams,
  useCreateRastreo,
  useUpdateRastreo,
} from "../../../../store/app/rastreo.actions";
import { useFetchClients } from "../../../../store/app/client.actions";
import { rastreoFormSchema } from "../../../../shared/util/validation-schemas/app/rastreo/rastreo.schema";
import { useFetchMicrochips } from "../../../../store/app/microchip.actions";

export interface SaveRastreoProps {
  title: string;
  rastreo?: Rastreo;
}

type SaveFormData = CreateRastreoParams;

const SaveGps: React.FC<SaveRastreoProps> = ({ title, rastreo }) => {
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(rastreoFormSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createRastreoMutation = useCreateRastreo({
    navigate,
    returnUrl: returnUrlGpssPage,
  });
  const updateRastreoMutation = useUpdateRastreo({
    navigate,
    returnUrl: returnUrlGpssPage,
  });

  let referenciasGps: string[] = [];

  const fetchedGps = useFetchGpss().data?.data;
  if (fetchedGps) {
    referenciasGps = fetchedGps.map((gps) => gps.serial);
  }

  let emailClients: string[] = [];

  const fetchedClients = useFetchClients().data?.data;
  if (fetchedClients) {
    emailClients = fetchedClients.map((client) => client.email);
  }

  let celularMicrochips: string[] = [];

  const fetchedMicrochips = useFetchMicrochips().data?.data;
  if (fetchedMicrochips) {
    celularMicrochips = fetchedMicrochips.filter((micro) => micro.estado == "ACTIVO").map((micro) => micro.celular);
  }

  const fetchClients = useFetchClients();
  const fetchGpss = useFetchGpss();
  const fetchMicrochips = useFetchMicrochips();


  ///* handlers
  const onSave = async (data: SaveFormData) => {
    data.fechaInicio = dayjs(data.fechaInicio).format("YYYY-MM-DDTHH:mm:ss[Z]");
    data.fechaFin = dayjs(data.fechaFin).format("YYYY-MM-DDTHH:mm:ss[Z]");

    if (!isValid) return;

    const clientId = fetchClients.data?.data.filter(
      (client) => client.email === String(data.cliente)
    )[0].id;
    const gpsId = fetchGpss.data?.data.filter(
      (gps) => gps.serial === String(data.serial)
    )[0].id;

    const microchipId = fetchMicrochips.data?.data.filter(
      (micro) => micro.celular === String(data.celular)
    )[0].id;

    const rastreoData = {
      ...data,
      clientId,
      gpsId,
      microchipId,
      saldo: Number(data.saldo),
    };

    ///* upd
    if (rastreo?.id) {
      updateRastreoMutation.mutate({ id: rastreo.id, data });
      return;
    }

    ///* create
    createRastreoMutation.mutate(rastreoData);
  };

  ///* effects
  useEffect(() => {
    if (!rastreo?.id) return;
    reset({
      ...rastreo,
      estado: rastreo.microchip.estado,
      serial: rastreo.gps.serial,
      cliente: rastreo.client.email,
      saldo: rastreo.microchip.saldo,
      celular: rastreo.microchip.celular,
      fechaFin: rastreo.fecha_fin,
      fechaInicio: rastreo.fecha_inicio,
      /// gps
    });
  }, [rastreo, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlGpssPage)}
      onSave={handleSubmit(onSave, (err) => {
        console.log(err);
      })}
      customTextBtn="Obtener coordenadas"
    >
      <CustomAutocompleteArrString
        label="Serial"
        name="serial"
        options={referenciasGps}
        control={form.control}
        defaultValue={form.getValues().serial}
        error={errors.serial}
        helperText={"Introduce un serial"}
        isLoadingData={false}
        size={gridSizeMdLg6}
        disableClearable
      />
      <CustomAutocompleteArrString
        label="cliente"
        name="cliente"
        options={emailClients}
        control={form.control}
        defaultValue={form.getValues().cliente}
        error={errors.cliente}
        helperText={"Introduce un email"}
        isLoadingData={false}
        size={gridSizeMdLg6}
        disableClearable
      />
      <CustomAutocompleteArrString
        label="celular"
        name="celular"
        options={celularMicrochips}
        control={form.control}
        defaultValue={form.getValues().celular}
        error={errors.celular}
        helperText={"Introduce un celular"}
        isLoadingData={false}
        size={gridSizeMdLg6}
        disableClearable
        onChangeValue={(value) => {
          let micro = fetchedMicrochips?.filter((micro) => micro.celular == value)[0];
          form.setValue('estado', micro?.estado || ''); 
          form.setValue('saldo', (parseFloat(micro?.saldo || '')) || 0); 
        }}
      />
      <CustomTextField
        label="Referencia"
        name="referencia"
        type="text"
        control={form.control}
        defaultValue={form.getValues().referencia}
        error={errors.referencia}
        helperText={"introduce la referencia"}
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

      <CustomTextField
        label="Saldo"
        name="saldo"
        type="text"
        control={form.control}
        defaultValue={form.getValues().saldo}
        error={errors.saldo}
        helperText={errors.saldo?.message}
        size={gridSizeMdLg6}
      />

      <SampleDatePicker
        label="Fecha de Inicio"
        name="fechaInicio"
        control={form.control}
        defaultValue={form.getValues().fechaInicio}
        error={errors.fechaInicio}
        helperText={errors.fechaInicio?.message}
        size={gridSizeMdLg6}
        disabled={false}
      />

      <SampleDatePicker
        label="Fecha de Fin"
        name="fechaFin"
        control={form.control}
        defaultValue={form.getValues().fechaFin}
        error={errors.fechaFin}
        helperText={errors.fechaFin?.message}
        size={gridSizeMdLg6}
        disabled={false}
      />
    </SingleFormBoxScene>
  );
};

export default SaveGps;
