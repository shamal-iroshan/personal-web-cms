import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import StyledButton from './StyledButton';

const HeaderText = styled.h1`
  font-weight: 800;
  font-size: 30px;
  color: #25334f;
  text-align: left;

  @media screen and (max-width: 899px) {
    font-size: 24px;
  }
`;

const ProfileImage = styled.img`
  height: 40px;
  min-width: 40px;
  width: 40px;
  border-radius: 100%;
  margin-right: 10px;
  object-fit: cover;
`;

interface PageTitleProps {
  title: string;
  titleIcon?: JSX.Element;
  titleIconAction?: () => void;
  logo?: string;
  actionButtonText?: string;
  action?: () => void;
  disabled?: boolean;
}

export default function PageTitle(props: PageTitleProps) {
  const {
    title,
    titleIcon,
    titleIconAction,
    logo,
    actionButtonText,
    action,
    disabled = false,
  } = props;
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  return (
    <Grid
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      sx={(theme) => ({
        margin: '48px 48px 24px',
        [theme.breakpoints.down('md')]: {
          margin: '24px',
        },
      })}
    >
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          onClick={titleIconAction}
          sx={{
            cursor: titleIconAction ? 'pointer' : 'unset',
          }}
        >
          {titleIcon}
          {titleIcon && <div style={{ width: '20px' }} />}
          {logo && <ProfileImage src={logo} alt="profile pic" />}
          <HeaderText>{title}</HeaderText>
        </Box>
      </Box>
      {actionButtonText && (
        <StyledButton
          disabled={disabled}
          isSmallButton={isSmallScreen}
          buttonText={actionButtonText}
          startIcon={<AddCircleOutlineOutlinedIcon sx={{ fontSize: '20px' }} />}
          onClick={action}
        />
      )}
    </Grid>
  );
}
