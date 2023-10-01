import * as React from 'react';
import { useContext, useMemo } from 'react';
import { styled as materialStyled, Theme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import styled from 'styled-components';
import { useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { AuthContext } from '../App';

interface IsSelectedProps {
  selected?: boolean;
}

const MaterialStyledListItemButton = materialStyled(ListItemButton)(
  (props: IsSelectedProps) => ({
    height: 46,
    padding: 0,
    borderLeft: props.selected ? '4px solid #164cee' : '4px solid transparent',
  }),
);

const MaterialStyledTypography = materialStyled(Typography)(
  (props: IsSelectedProps) => ({
    fontWeight: '700',
    fontSize: '16px',
    color: props.selected ? '#164cee' : 'rgba(37, 51, 79, 0.6)',
    marginLeft: 16,
  }),
);

interface StyledSvgProps {
  color: string;
}

const StyledSvgWrapper = styled.div<StyledSvgProps>`
  margin-left: 28px;
  width: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  & path {
    fill: ${(props) => props.color};
  }
`;

interface PageNavigationLinkProps {
  path: string;
  text: string;
  icon: JSX.Element;
}

export default function PageNavigationLink(props: PageNavigationLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const { path, text, icon } = props;
  const isSelected = useMemo(
    () => `/${(location.pathname || '').split('/')?.[1]}` === path,
    [location.pathname, path],
  );
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  return (
    <MaterialStyledListItemButton
      selected={isSelected}
      onClick={() => {
        if (isSmallScreen) {
          setTimeout(() => {
            auth.setDrawerOpen(false);
          }, 100);
        }
        navigate(path, { replace: false });
      }}
    >
      <StyledSvgWrapper
        color={isSelected ? '#164cee' : 'rgba(37, 51, 79, 0.6)'}
      >
        {icon}
      </StyledSvgWrapper>
      <MaterialStyledTypography selected={isSelected}>
        {text}
      </MaterialStyledTypography>
    </MaterialStyledListItemButton>
  );
}
