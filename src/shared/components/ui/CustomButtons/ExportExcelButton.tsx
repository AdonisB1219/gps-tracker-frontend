import { Box, Button } from '@mui/material';
import { GrDocumentCsv } from 'react-icons/gr';


export type ExportExcelButtonProps = {
  handleExportData: () => void;
};

const ExportExcelButton: React.FC<ExportExcelButtonProps> = ({
  handleExportData,
}) => {

  return (

        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            padding: '8px',
            flexWrap: 'wrap',
          }}
        >
          <Button
            onClick={handleExportData}
            startIcon={<GrDocumentCsv />}
            color="success"
          >
            Exportar CSV
          </Button>
        </Box>
  );
};

export default ExportExcelButton;
