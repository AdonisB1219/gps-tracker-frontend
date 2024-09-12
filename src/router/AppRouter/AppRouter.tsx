import { Navigate, createBrowserRouter } from 'react-router-dom';


import { PrivateRoutes } from '../PrivateRoutes';
import { LoginPage } from '../../auth/pages';
import { AppLayout } from '../../app/layouts';
import { DashboardHome } from '../../app/home/pages/DashboardHome';
import AuthRoutes from '../AuthRoutes/AuthRoutes';
import { AuthLayout } from '../../auth/layout';
import UsersPage from '../../app/users/pages/UsersPage/UsersPage';
import CreateUserPage from '../../app/users/pages/CreateUserPage/CreateUserPage';


const AppRouter = createBrowserRouter([
  ///* Free Routes


  ////* Auth
  {
    path: '/',
    element: (
      <AuthRoutes>
        <AuthLayout />
      </AuthRoutes>
    ),
    children: [{ path: '/', element: <LoginPage /> }],
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
        path: 'usuarios',
        element: <UsersPage />
      },
      {
        path: 'usuarios/crear',
        element: <CreateUserPage />
      }

      ////* Pets
    ],
  },
]);

export default AppRouter;
