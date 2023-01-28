import React, { useContext } from 'react';
import { styled as materialStyled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Theme, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AppBarSkeleton from './AppBarSkeleton';
import NotificationMenu from './NotificationMenu';
import UserProfileMenu from './UserProfileMenu';
// eslint-disable-next-line import/no-cycle
import { AuthContext } from '../App';

const AppBarContainer = materialStyled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  minHeight: 105,
  justifyContent: 'center',
  backgroundColor: 'white',
  borderBottom: '1px solid #E3E8EF',
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const UserProfileContainer = materialStyled(Button)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

// const MaterialStyledTypography = materialStyled(Typography)({
//   fontWeight: 700,
//   color: '#25334F',
//   fontSize: 18,
//   marginLeft: '12px',
// }) as typeof Typography;

const StyledLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledRightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function AppBar() {
  const [anchorElProfileMenu, setAnchorElProfileMenu] =
    React.useState<null | HTMLElement>(null);
  const [anchorElNotifications, setAnchorElNotifications] =
    React.useState<null | HTMLElement>(null);
  const auth = useContext(AuthContext);
  const isLoading = false;
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  const handleClickProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfileMenu(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setAnchorElProfileMenu(null);
  };
  const handleClickNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotifications(event.currentTarget);
  };
  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  return (
    <AppBarContainer elevation={0} position="absolute">
      <Toolbar
        sx={(theme) => ({
          marginLeft: '8px',
          marginRight: '8px',
          justifyContent: 'space-between',
          [theme.breakpoints.down('md')]: {
            marginLeft: 0,
            marginRight: 0,
          },
        })}
      >
        <StyledLeftContainer>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log(auth.isDrawerOpen);
              auth.setDrawerOpen(!auth.isDrawerOpen);
            }}
            sx={(theme) => ({
              color: '#25334F',
              marginRight: '18px',
              [theme.breakpoints.up('md')]: {
                display: 'none',
              },
            })}
          >
            {auth.isDrawerOpen ? <CloseOutlinedIcon /> : <MenuIcon />}
          </IconButton>
        </StyledLeftContainer>
        <StyledRightContainer>
          {isLoading ? (
            <AppBarSkeleton />
          ) : (
            <>
              <IconButton
                onClick={handleClickNotifications}
                sx={(theme) => ({
                  color: '#25334F',
                  marginRight: '28px',
                  [theme.breakpoints.down('md')]: {
                    display: 'none',
                  },
                })}
              >
                <Badge
                  badgeContent={4}
                  color="secondary"
                  sx={{
                    '& .MuiBadge-badge': {
                      color: 'white',
                      backgroundColor: '#164cee',
                    },
                  }}
                >
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              </IconButton>
              {!isSmallScreen && (
                <NotificationMenu
                  anchorEl={anchorElNotifications}
                  handleClose={handleCloseNotifications}
                />
              )}
              <UserProfileContainer
                onClick={handleClickProfileMenu}
                disableRipple
                disableElevation
                sx={{
                  minWidth: 0,
                  padding: 0,
                  textTransform: 'none',
                  '&.MuiButtonBase-root:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={(theme) => ({
                    [theme.breakpoints.down('md')]: {
                      display: 'none',
                    },
                  })}
                >
                  <MenuIcon sx={{ color: '#25334F' }} />
                  {/* <MaterialStyledTypography> */}
                  {/*  Shamal iroshan */}
                  {/* </MaterialStyledTypography> */}
                </Box>
                <ExpandMoreOutlinedIcon
                  sx={(theme) => ({
                    color: '#25334F',
                    marginLeft: '4px',
                    [theme.breakpoints.down('md')]: {
                      display: 'none',
                    },
                  })}
                />
              </UserProfileContainer>
              <UserProfileMenu
                anchorEl={anchorElProfileMenu}
                handleClose={handleCloseProfileMenu}
              />
            </>
          )}
        </StyledRightContainer>
      </Toolbar>
    </AppBarContainer>
  );
}
