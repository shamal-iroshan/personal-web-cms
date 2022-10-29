import Grid from '@mui/material/Grid';
import React from 'react';
import styled from 'styled-components';

const CardBody = styled.div`
  max-width: 380px;
  width: 100%;
  margin: 30px 0;
`;

export default function GuestWrapper({ children }: { children: JSX.Element }) {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={12}
        alignItems="center"
        sx={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 50px',
          minHeight: '100vh',
        }}
      >
        <CardBody>{children}</CardBody>
      </Grid>
    </Grid>
  );
}
