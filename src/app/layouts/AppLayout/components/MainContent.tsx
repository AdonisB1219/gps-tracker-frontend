/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import { SxPropsThemeType } from '../../../../shared/interfaces/ui';
import { useResponsive } from '../../../../shared/hooks/ui/useResponsive';
import { HEADER, NAV } from '../../../../shared/constants';



const SPACING = 0;

interface MainContentProps {
  children: ReactNode;
  sx?: SxPropsThemeType;
  [key: string]: any;
}

export default function MainContent({
  children,
  sx,
  ...other
}: MainContentProps) {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
