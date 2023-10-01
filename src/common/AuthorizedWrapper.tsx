import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import StyledButton from './StyledButton';
// eslint-disable-next-line import/no-cycle
import AppBar from './AppBar';
// eslint-disable-next-line import/no-cycle
import LeftDrawer from './LeftDrawer';
import { useAppDispatch, useAppSelector } from '../store/types';
import {
  selectSignInIsSuccess,
  signInActions,
} from '../views/signIn/slice/signInSlice';
import { ROUTE_SIGN_IN } from './routes';
import { auth } from '../config/firebase';

const StyledDiv = styled.div`
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledError = styled.p`
  font-size: 18px;
  color: #718096;
  text-align: center;
  margin-bottom: 24px;
`;

const StyledErrorTitle = styled.h1`
  color: #718096;
  text-align: center;
`;

function HomeWrapper({ children }: { children: JSX.Element }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar />
      <LeftDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          overflow: 'auto',
          paddingTop: '105px',
          paddingLeft: '0px',
          backgroundColor: '#F8F9FA',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default function AuthorizedWrapper({
  children,
}: {
  children: JSX.Element;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signInSuccess = useAppSelector(selectSignInIsSuccess);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        dispatch(signInActions.setIdToken(idToken));
      } else {
        navigate(ROUTE_SIGN_IN, { replace: true });
      }
    });
  }, [dispatch, navigate, signInSuccess]);

  const isError = false;
  if (isError) {
    return (
      <HomeWrapper>
        <StyledDiv>
          <StyledErrorTitle>Error</StyledErrorTitle>
          <StyledError>
            Some error has occurred please sign out and try again!
          </StyledError>
          <StyledButton
            isError
            buttonText="Sign out"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('sign out');
            }}
          />
        </StyledDiv>
      </HomeWrapper>
    );
  }
  return <HomeWrapper>{children}</HomeWrapper>;
}
