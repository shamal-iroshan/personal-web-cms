import React, { useContext, useEffect } from 'react';
import { List, styled as materialStyled, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import styled from 'styled-components';
import SettingsIcon from '@mui/icons-material/Settings';
import CollectionsIcon from '@mui/icons-material/Collections';
import MessageIcon from '@mui/icons-material/Message';
// eslint-disable-next-line import/no-cycle
import { AuthContext } from '../App';
import LeftDrawerSkeleton from './LeftDrawerSkeleton';
// eslint-disable-next-line import/no-cycle
import PageNavigationLink from './PageNavigationLink';
import { ROUTE_CONFIG, ROUTE_MESSAGE, ROUTE_PORTFOLIO } from './routes';

const drawerWidth = 240;

const Drawer = materialStyled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  position: 'relative',
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    paddingTop: 137,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
    }),
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
    },
  },
}));

const StyledVersion = styled.p`
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: lightgrey;
`;

const Spacer = styled.div`
  height: 50px;
`;

export default function LeftDrawer() {
  const auth = useContext(AuthContext);
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );
  const isLoading = false;

  useEffect(() => {
    if (isSmallScreen) {
      auth.setDrawerOpen(false);
    } else {
      auth.setDrawerOpen(true);
    }
  }, [isSmallScreen]);

  return (
    <Drawer variant="permanent" open={auth.isDrawerOpen}>
      <List component="nav">
        {isLoading ? (
          <LeftDrawerSkeleton />
        ) : (
          <>
            <PageNavigationLink
              path={ROUTE_CONFIG}
              text="Config"
              icon={<SettingsIcon />}
            />
            <PageNavigationLink
              path={ROUTE_PORTFOLIO}
              text="Portfolio"
              icon={<CollectionsIcon />}
            />
            <PageNavigationLink
              path={ROUTE_MESSAGE}
              text="Messages"
              icon={<MessageIcon />}
            />
          </>
        )}
      </List>
      <Spacer />
      <StyledVersion>{process.env.REACT_APP_VERSION}</StyledVersion>
    </Drawer>
  );
}
