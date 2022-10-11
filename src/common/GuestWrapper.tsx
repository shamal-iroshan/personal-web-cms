import Grid from '@mui/material/Grid';
import React from 'react';
import styled from 'styled-components';

const CardBody = styled.div`
  max-width: 380px;
  width: 100%;
  margin: 30px 0;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 80px 0 0 80px;
  object-fit: cover;
`;

const StyledDiv = styled.div`
  position: fixed;
  right: 0;
  width: 50%;
  height: 100vh;
  border-radius: 80px 0 0 80px;
  background: lightgray;
  @media screen and (max-width: 899px) {
    display: none;
  }
`;

export default function GuestWrapper({ children }: { children: JSX.Element }) {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={6}
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
      <Grid item xs={6}>
        <StyledDiv>
          <Image
            src="https://cdn.pixabay.com/photo/2022/08/17/04/07/tree-7391504_960_720.jpg"
            alt="background"
          />
        </StyledDiv>
      </Grid>
    </Grid>
  );
}
