import { Navigate } from 'react-router-dom';
//import { useAuthStore } from '../../store/auth/auth.store';


export interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  //const isAuth = useAuthStore(s => s.isAuth);
  //TODO use auth
  const isAuth = true;

  return !isAuth ? <Navigate to="/" replace /> : children;
};

export default PrivateRoutes;
