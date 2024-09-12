import { ReactElement } from 'react';
import { FaHome, FaUser, FaUserAlt } from 'react-icons/fa';
import { FaPencil, FaUserDoctor } from 'react-icons/fa6';
import { MdAdminPanelSettings, MdOutlinePets, MdOutlineWork } from 'react-icons/md';

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
    title: 'Usuarios',
    path: '/dashboard/usuarios',
    icon: <FaUser />,
  },
  {
    title: 'Mantenimiento',
    path: '/dashboard/mantenimiento',
    icon: <FaPencil />,
  },
];
