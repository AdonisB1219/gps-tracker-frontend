import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth/auth.store';


export interface AuthRoutesProps {
  children: React.ReactNode;
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({ children }) => {
  const isAuth = useAuthStore(s => s.isAuth);
  //TODO change back to auth
  return <Navigate to="/dashboard/home" replace />;
};

export default AuthRoutes;
