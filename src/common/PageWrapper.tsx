import React from 'react';
import { Grid } from '@mui/material';

interface PageWrapperProps {
  children: JSX.Element | JSX.Element[];
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <Grid
      container
      flexDirection="column"
      sx={(theme) => ({
        backgroundColor: '#FFFFFF',
        margin: '0 48px 48px',
        padding: '40px 48px',
        width: 'unset',
        borderRadius: '12px',
        [theme.breakpoints.down('md')]: {
          margin: '0',
          padding: '24px',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      })}
    >
      {children}
    </Grid>
  );
}
