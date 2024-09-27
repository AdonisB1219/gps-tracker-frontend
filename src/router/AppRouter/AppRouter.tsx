import { createBrowserRouter } from 'react-router-dom';


import { PrivateRoutes } from '../PrivateRoutes';
import { LoginPage } from '../../auth/pages';
import { AppLayout } from '../../app/layouts';
import { DashboardHome } from '../../app/home/pages/DashboardHome';
import AuthRoutes from '../AuthRoutes/AuthRoutes';
import { AuthLayout } from '../../auth/layout';
import CreateAdminPage from '../../app/admins/pages/CreateAdminPage/CreateAdminPage';
import AdminsPage from '../../app/admins/pages/AdminPage/AdminsPage';
import ClientsPage from '../../app/service/clients/pages/ClientPage/ClientsPage';
import CreateClientPage from '../../app/service/clients/pages/CreateClientPage/CreateClientPage';
import CreateGpsPage from '../../app/service/gps/pages/CreateGpsPage/CreateGpsPage';
import GpssPage from '../../app/service/gps/pages/GpsPage.tsx/GpsPage';
import Home from '../../landing/pages/Home';
import SaveMtoGps from '../../app/maintenance/gps/pages/SaveMtnGps';
import SaveMicro from '../../app/maintenance/microchips/pages/SaveMicro';



const AppRouter = createBrowserRouter([
  ///* Free Routes
  {
    path: '/',
    element: (
      <Home />
    )
  },

  ////* Auth
  {
    path: '/auth',
    element: (
      <AuthRoutes>
        <AuthLayout />
      </AuthRoutes>
    ),
    children: [{ path: '', element: <LoginPage /> }],
  },

  ////* Private Routes
  {
    path: '/dashboard',
    element: (
      <PrivateRoutes>
        <AppLayout />
      </PrivateRoutes>
    ),
    children: [
      ///* Home
      {
        path: 'home',
        element: <DashboardHome />,
      }, 
      {
        path: 'administradores',
        element: <AdminsPage />
      },
      {
        path: 'administradores/crear',
        element: <CreateAdminPage />
      },
      {
        path: 'servicio/clientes',
        element: <ClientsPage />
      },
      {
        path: 'servicio/clientes/crear',
        element: <CreateClientPage />
      },
      {
        path: 'servicio/gps',
        element: <GpssPage />
      },
      {
        path: 'servicio/gps/crear',
        element: <CreateGpsPage />
      },
      {
        path: 'mantenimiento/gps',
        element: <SaveMtoGps title='Mantenimiento Gps' />
      },
      {
        path: 'mantenimiento/microchips',
        element: <SaveMicro title='Mantenimiento Microchips' />
      },
      

      ////* Pets
    ],
  },
]);

export default AppRouter;
