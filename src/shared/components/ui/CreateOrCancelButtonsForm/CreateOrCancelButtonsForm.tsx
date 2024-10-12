import { Button, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";

export type CreateOrCancelButtonsFormProps = {
  onCancel: () => void;
  cancelTextBtn?: string;
  onSave: () => void;
  saveTextBtn?: string;
  disabled?: boolean;
  pt?: number;
  customTextBtn?: string;
};

const CreateOrCancelButtonsForm: React.FC<CreateOrCancelButtonsFormProps> = ({
  onCancel,
  cancelTextBtn = "Cancelar",
  onSave,
  saveTextBtn = "Guardar",
  disabled = false,
  pt = 6,
  customTextBtn,
}) => {
  const {pathname} = useLocation();


  return (
    <Grid container spacing={1} justifyContent="end" pt={pt}>
      <Grid item>
        <Button onClick={onCancel} variant="text">
          {cancelTextBtn || "Cancelar"}
        </Button>
      </Grid>

      <Grid item>
        <Button onClick={onSave} variant="contained" disabled={disabled}>
          {saveTextBtn || "Guardar"}
        </Button>
      </Grid>

     {pathname.includes("/servicio/gps/crear") && <Grid item>
        <Button
          onClick={() => window.open("http://rastreo.novetrack.com/")}
          variant="contained"
          disabled={disabled}
        >
          Rastreo
        </Button>
      </Grid>}

      {customTextBtn != null && (
        <Grid item>
          <Button
            onClick={() =>
              window.open(
                "https://messages.google.com/web/authentication?hl=es-419"
              )
            }
            variant="contained"
            disabled={disabled}
          >
            {customTextBtn}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default CreateOrCancelButtonsForm;
