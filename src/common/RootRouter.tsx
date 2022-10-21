import React, { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import {
  ROUTE_CONFIG,
  ROUTE_MESSAGE,
  ROUTE_PORTFOLIO,
  ROUTE_SIGN_IN,
} from './routes';
import GuestWrapper from './GuestWrapper';
import SignIn from '../views/signIn/pages/SignIn';
// eslint-disable-next-line import/no-cycle
import AuthorizedWrapper from './AuthorizedWrapper';

export default function RootRouter() {
  const location = useLocation();

  useEffect(() => {
    const mainBody = document.querySelector('main');
    mainBody?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route
        path={ROUTE_SIGN_IN}
        element={
          <GuestWrapper>
            <SignIn />
          </GuestWrapper>
        }
      />
      <Route
        path={ROUTE_CONFIG}
        element={
          <AuthorizedWrapper>
            <Outlet />
          </AuthorizedWrapper>
        }
      >
        <Route index element={<h1>Config</h1>} />
        <Route path="add" element={<h1>Config add</h1>} />
        <Route path=":configId" element={<h1>Config edit</h1>} />
      </Route>
      <Route
        path={ROUTE_PORTFOLIO}
        element={
          <AuthorizedWrapper>
            <Outlet />
          </AuthorizedWrapper>
        }
      >
        <Route index element={<h1>Portfolio</h1>} />
        <Route path="add" element={<h1>Portfolio add</h1>} />
        <Route path=":portfolioId" element={<h1>Portfolio edit</h1>} />
      </Route>
      <Route
        path={ROUTE_MESSAGE}
        element={
          <AuthorizedWrapper>
            <Outlet />
          </AuthorizedWrapper>
        }
      >
        <Route index element={<h1>Message</h1>} />
        <Route path=":messageId" element={<h1>Message view</h1>} />
      </Route>
      <Route path="/" element={<Navigate to={ROUTE_SIGN_IN} replace />} />
      <Route path="*" element={<h1>Oops!</h1>} />
    </Routes>
  );
}
