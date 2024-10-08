/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container, Grid, Stack, Typography } from '@mui/material';

import { useIsMediaQuery } from '../../../hooks/ui/useIsMediaQuery';
import { CreateOrCancelButtonsForm } from '../CreateOrCancelButtonsForm';

export type SingleFormBoxSceneProps = {
  children: React.ReactNode;
  titlePage: string;
  onCancel: () => void;
  onSave: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;

  disableSubmitBtn?: boolean;
  customTextBtn?: string
};

const SingleFormBoxScene: React.FC<SingleFormBoxSceneProps> = ({
  children,
  titlePage,
  onCancel,
  onSave,
  disableSubmitBtn = false,
  customTextBtn
}) => {
  const isMobile = useIsMediaQuery('sm');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4" pb={isMobile ? 3 : 6}>
            {titlePage}
          </Typography>

          {/* ======= form ======= */}
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Grid item container spacing={3} justifyContent="center">
                {children}

                {/* ====== submit btn ====== */}
                <CreateOrCancelButtonsForm
                  onCancel={onCancel}
                  onSave={onSave}
                  disabled={disableSubmitBtn}
                  customTextBtn={customTextBtn}
                />
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default SingleFormBoxScene;
