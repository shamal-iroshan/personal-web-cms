import * as React from 'react';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import { styled as materialStyled } from '@mui/material/styles';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import ResetPasswordModal from './ResetPasswordModal';

const StyledMenuItem = materialStyled(MenuItem)({
  height: '46px',
}) as typeof MenuItem;

interface UserProfileMenuProps {
  anchorEl: null | HTMLElement;
  handleClose: VoidFunction;
}

export default function UserProfileMenu(props: UserProfileMenuProps) {
  const { anchorEl, handleClose } = props;
  const open = Boolean(anchorEl);
  const [isResetOwnPasswordModalOpen, setOpenResetOwnPasswordModal] =
    useState(false);

  const handleSignOut = () => {
    // eslint-disable-next-line no-console
    console.log('sign out');
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: '220px',
            border: '1px solid #E3E8EF',
            boxShadow: '0 0 10px 2px #E3E8EF',
            overflow: 'visible',
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <StyledMenuItem onClick={() => setOpenResetOwnPasswordModal(true)}>
          <ListItemIcon>
            <LockOpenOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Change password
        </StyledMenuItem>
        <StyledMenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </StyledMenuItem>
      </Menu>
      <ResetPasswordModal
        open={isResetOwnPasswordModalOpen}
        handleClose={() => setOpenResetOwnPasswordModal(false)}
      />
    </>
  );
}
