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
import Config from '../views/config/pages/Config';
import AddConfig from '../views/config/pages/AddConfig';
import Portfolio from '../views/portfolio/pages/Portfolio';
import AddPortfolio from '../views/portfolio/pages/AddPortfolio';
import Message from '../views/message/pages/Message';

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
        <Route index element={<Config />} />
        <Route path="add" element={<AddConfig />} />
        <Route path=":configId" element={<AddConfig />} />
      </Route>
      <Route
        path={ROUTE_PORTFOLIO}
        element={
          <AuthorizedWrapper>
            <Outlet />
          </AuthorizedWrapper>
        }
      >
        <Route index element={<Portfolio />} />
        <Route path="add" element={<AddPortfolio />} />
        <Route path=":portfolioId" element={<AddPortfolio />} />
      </Route>
      <Route
        path={ROUTE_MESSAGE}
        element={
          <AuthorizedWrapper>
            <Outlet />
          </AuthorizedWrapper>
        }
      >
        <Route index element={<Message />} />
      </Route>
      <Route path="/" element={<Navigate to={ROUTE_SIGN_IN} replace />} />
      <Route path="*" element={<h1>Oops!</h1>} />
    </Routes>
  );
}
