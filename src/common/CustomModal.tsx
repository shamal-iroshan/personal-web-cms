import React from 'react';
import { Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';

interface CustomModalProps {
  children: JSX.Element | JSX.Element[];
  open: boolean;
  handleClose: () => void;
}

export default function CustomModal({
  children,
  open,
  handleClose,
}: CustomModalProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="body"
      className="confirm-modal"
    >
      <Grid
        container
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={(theme) => ({
          width: 'unset',
          outline: 'none',
          minWidth: 600,
          maxWidth: 600,
          padding: '40px',
          backgroundColor: '#ffffff',
          [theme.breakpoints.down('md')]: {
            minWidth: '100%',
            padding: '24px',
          },
        })}
      >
        {children}
      </Grid>
    </Dialog>
  );
}
