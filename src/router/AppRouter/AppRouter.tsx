import { createBrowserRouter } from 'react-router-dom';


import { PrivateRoutes } from '../PrivateRoutes';
import { LoginPage } from '../../auth/pages';
import { AppLayout } from '../../app/layouts';
import { DashboardHome } from '../../app/home/pages/DashboardHome';
import AuthRoutes from '../AuthRoutes/AuthRoutes';
import { AuthLayout } from '../../auth/layout';
import CreateAdminPage from '../../app/admins/pages/CreateAdminPage/CreateAdminPage';
import Home from '../../landing/pages/Home';
import ClientsPage from '../../app/clients/pages/ClientPage/ClientsPage';
import AdminsPage from '../../app/admins/pages/AdminPage/AdminsPage';
import CreateClientPage from '../../app/clients/pages/CreateClientPage/CreateClientPage';
import GpssPage from '../../app/gps/pages/GpsPage.tsx/GpsPage';
import CreateGpsPage from '../../app/gps/pages/CreateGpsPage/CreateGpsPage';


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
        path: 'clientes',
        element: <ClientsPage />
      },
      {
        path: 'clientes/crear',
        element: <CreateClientPage />
      },
      {
        path: 'gps',
        element: <GpssPage />
      },
      {
        path: 'gps/crear',
        element: <CreateGpsPage />
      },
      

      ////* Pets
    ],
  },
]);

export default AppRouter;
