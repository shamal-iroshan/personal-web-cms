import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../store/types';
import {
  selectSignInIsSuccess,
  signInActions,
} from '../views/signIn/slice/signInSlice';
import { ROUTE_CONFIG } from './routes';
import { auth } from '../config/firebase';

const CardBody = styled.div`
  max-width: 380px;
  width: 100%;
  margin: 30px 0;
`;

export default function GuestWrapper({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signInSuccess = useAppSelector(selectSignInIsSuccess);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        dispatch(signInActions.setIdToken(idToken));
        navigate(ROUTE_CONFIG, { replace: true });
      }
    });
  }, [dispatch, navigate, signInSuccess]);

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
