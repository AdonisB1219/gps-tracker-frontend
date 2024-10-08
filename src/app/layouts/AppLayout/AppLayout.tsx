/* eslint-disable @typescript-eslint/no-empty-object-type */
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header, MainContent } from '.';
import { SideNav } from '../../../shared/components/ui/SideNav';

interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <SideNav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <MainContent>
          <Outlet />
        </MainContent>
      </Box>
    </>
  );
};

export default AppLayout;
