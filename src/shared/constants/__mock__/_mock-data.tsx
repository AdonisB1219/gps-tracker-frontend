import { ReactElement } from 'react';
import { FaHome, FaLocationArrow, FaUser, FaUserTie } from 'react-icons/fa';
import { FaLocationCrosshairs, FaLocationDot } from 'react-icons/fa6';

export interface NavItemInterface {
  title: string;
  path: string;
  icon: ReactElement;
  children?: NavItemInterface[];
}

export const navConfig: NavItemInterface[] = [
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
    title: 'Servicio',
    path: '/dashboard/servicio',
    icon: <FaUser />,
    children:
    [
      {
        title: 'Clientes',
        path: '/dashboard/servicio/clientes',
        icon: <FaUser />,
      },
      {
        title: 'GPS',
        path: '/dashboard/servicio/gps',
        icon: <FaLocationCrosshairs />,
      },
    ]
  },

  {
    title: 'Mantenimiento',
    path: '/dashboard/mantenimiento',
    icon: <FaLocationDot />,
    children: [
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
    ]
  },

];
