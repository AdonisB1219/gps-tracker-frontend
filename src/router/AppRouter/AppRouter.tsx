import { createBrowserRouter } from 'react-router-dom';


import { PrivateRoutes } from '../PrivateRoutes';
import { LoginPage } from '../../auth/pages';
import { AppLayout } from '../../app/layouts';
import { DashboardHome } from '../../app/home/pages/DashboardHome';
import AuthRoutes from '../AuthRoutes/AuthRoutes';
import { AuthLayout } from '../../auth/layout';
import UsersPage from '../../app/users/pages/UsersPage/UsersPage';
import CreateAdminPage from '../../app/users/pages/CreateUserPage/CreateUserPage';
import Home from '../../landing/pages/Home';


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
        element: <UsersPage />
      },
      {
        path: 'administradores/crear',
        element: <CreateAdminPage />
      }

      ////* Pets
    ],
  },
]);

export default AppRouter;
