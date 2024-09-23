import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import { alpha, Theme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { usePathname } from '../../../hooks/ui/usePathname';
import { useResponsive } from '../../../hooks/ui/useResponsive';
import { navConfig, NAV } from '../../../constants';
import { Scrollbar } from '../Scrollbar';
import { CustomRouterLink } from './components';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { Collapse } from '@mui/material';
import { NavItemInterface } from '../../../constants';


interface NavProps {
  openNav: boolean;
  onCloseNav: () => void;
}

interface NavItemProps {
  item: {
    path: string;
    title: string;
    icon: React.ReactElement;
  };
}

interface DropdownMenuProps {
  item: {
    title: string;
    path?: string
    children?: NavItemInterface[]; 
    icon: React.ReactElement;
  };
}

export default function SideNav({ openNav, onCloseNav }: NavProps) {
  const pathname = usePathname();


  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme: Theme) => alpha(theme.palette.grey[700], 0.03),
      }}
    >
      
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map(item => {

        return item.children ? <DropdownMenu key={item.title} item={item}/> : <NavItem key={item.title} item={item} />;

      })}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme: Theme) =>
              `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

function NavItem({ item }: NavItemProps) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={CustomRouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

const DropdownMenu = ({ item }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick} 
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'text.secondary',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightMedium',
          ...(open && {
            color: 'primary.main',
            fontWeight: 'fontWeightSemiBold',
            bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
              bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.16),
            },
          }),
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          {item.icon}
        </Box>

        <Box component="span">{item.title}</Box>

        <Box component="span" sx={{ width: 24, height: 24, ml: 2, display: 'flex', alignItems: 'center'}}>
        {open ? <FaCaretUp /> : <FaCaretDown />}
        </Box>
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ pl: 4 }}>
          {/* Aquí puedes poner los submenús o botones adicionales */}
          {item.children?.map(item => {

return  <NavItem key={item.title} item={item} />;

})}
        </Box>
      </Collapse>
    </>
  );
};

