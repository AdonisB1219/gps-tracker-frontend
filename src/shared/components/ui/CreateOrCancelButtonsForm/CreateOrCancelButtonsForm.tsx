import { Button, Grid } from '@mui/material';

export type CreateOrCancelButtonsFormProps = {
  onCancel: () => void;
  cancelTextBtn?: string;
  onSave: () => void;
  saveTextBtn?: string;
  disabled?: boolean;
  pt?: number;
  customTextBtn?: string,

};

const CreateOrCancelButtonsForm: React.FC<CreateOrCancelButtonsFormProps> = ({
  onCancel,
  cancelTextBtn = 'Cancelar',
  onSave,
  saveTextBtn = 'Guardar',
  disabled = false,
  pt = 6,
  customTextBtn,
}) => {
  return (
    <Grid container spacing={1} justifyContent="end" pt={pt}>
      <Grid item>
        <Button onClick={onCancel} variant="text">
          {cancelTextBtn || 'Cancelar'}
        </Button>
      </Grid>

      <Grid item>
        <Button onClick={onSave} variant="contained" disabled={disabled}>
          {saveTextBtn || 'Guardar'}
        </Button>
      </Grid>

      {customTextBtn != null && (
    <Grid item>
      <Button onClick={() =>  window.location.href = 'https://messages.google.com/web/authentication?hl=es-419'} variant="contained" disabled={disabled}>
        {customTextBtn}
      </Button>
    </Grid>
  )}
    </Grid>
  );
};

export default CreateOrCancelButtonsForm;
