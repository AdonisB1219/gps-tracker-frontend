import { createBrowserRouter, Navigate } from 'react-router-dom';


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
import CreateGpsPage from '../../app/service/gps/pages/CreateRastreoPage/CreateRastreoPage';
import GpssPage from '../../app/service/gps/pages/RastreoPage/RastreoPage';
import Home from '../../landing/pages/Home';
import UpdateAdminPage from '../../app/admins/pages/UpdateAdminPage/UpdateAdminPage';
import UpdateClientPage from '../../app/service/clients/pages/UpdateClientPage/UpdateClient';
import UpdateRastreoPage from '../../app/service/gps/pages/UpdateRastreoPage/UpdateRastreoPage';
import GpsPage from '../../app/maintenance/gps/pages/GpsPage/GpsPage';
import CreateGpsMtoPage from '../../app/maintenance/gps/pages/CreateGps/CreateGps';
import UpdateGpsPage from '../../app/maintenance/gps/pages/UpdateGps/UpdateGps';



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
        path: 'administradores/editar/:id',
        element: <UpdateAdminPage />
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
        path: 'servicio/clientes/editar/:id',
        element: <UpdateClientPage />
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
        path: 'servicio/gps/editar/:id',
        element: <UpdateRastreoPage />
      },
      {
        path: 'mantenimiento/gps',
        element: <GpsPage />
      },
      {
        path: 'mantenimiento/gps/crear',
        element: <CreateGpsMtoPage />
      },
      {
        path: 'mantenimiento/gps/editar/:id',
        element: <UpdateGpsPage />
      },
      
      { path: '*', element: <Navigate to="/" /> },

      ////* Pets
    ],
  },
]);

export default AppRouter;
