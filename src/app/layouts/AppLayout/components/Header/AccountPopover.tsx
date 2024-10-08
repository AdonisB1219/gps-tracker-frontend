import { MouseEvent, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { navConfig } from '../../../../../shared/constants/__mock__';
import { useAuthStore } from '../../../../../store/auth/auth.store';
import { Admin } from '../../../../../shared/interfaces/auth';


const MENU_OPTIONS = navConfig;

// ----------------------------------------------------------------------

const AccountPopover = () => {
  const [open, setOpen] = useState<null | HTMLElement>(null);

  ///* global state
    const logout = useAuthStore(s => s.logout);
    const user: Admin = useAuthStore(s => s.user)!;
    const navigate = useNavigate();

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };


  const onLogout = async () => {
    handleClose();
    await logout();
    navigate('/'); 
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: theme => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: theme =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={''}
          alt={user?.email.at(0)?.toUpperCase()}
          sx={{
            width: 36,
            height: 36,
            border: theme => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.email?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map(option => {


          return (
            <Link
              to={option.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
              key={option.title}
            >
              <MenuItem key={option.title} onClick={handleClose}>
                {option.title}
              </MenuItem>
            </Link>
          );
        })}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={onLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
};
export default AccountPopover;
