import { ReactElement } from 'react';
import { FaHome, FaLocationArrow, FaUser, FaUserTie } from 'react-icons/fa';
import { FaLocationCrosshairs, FaLocationDot } from 'react-icons/fa6';

interface NavItem {
  title: string;
  path: string;
  icon: ReactElement;
  admin?: boolean;
  superadmin?: boolean;
}

export const navConfig: NavItem[] = [
  // home
  {
    title: 'Inicio',
    path: '/dashboard/home',
    icon: <FaHome />,
  },
  {
    title: 'Administradores',
    path: '/dashboard/administradores',
    icon: <FaUserTie />,
  },
  {
    title: 'Clientes',
    path: '/dashboard/clientes',
    icon: <FaUser />,
  },
  {
    title: 'GPS',
    path: '/dashboard/gps',
    icon: <FaLocationCrosshairs />,
  },
  {
    title: 'Mantenimiento Gps',
    path: '/dashboard/mantenimiento/gps',
    icon: <FaLocationDot />,
  },
  {
    title: 'Mantenimiento Microchips',
    path: '/dashboard/mantenimiento/microchips',
    icon: <FaLocationArrow />,
  },
];
