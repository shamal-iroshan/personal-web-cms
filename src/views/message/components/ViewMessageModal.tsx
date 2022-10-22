import React from 'react';
import { styled as materialStyled } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import CustomModal from '../../../common/CustomModal';
import StyledButton from '../../../common/StyledButton';

const TitleTypography = materialStyled(Typography)(() => ({
  fontWeight: 700,
  fontSize: 18,
  color: '#25334F',
  marginTop: 24,
  textAlign: 'left',
}));

const DescriptionTypography = materialStyled(Typography)(() => ({
  fontWeight: 400,
  fontSize: 14,
  color: '#25334F',
  marginTop: 12,
  textAlign: 'left',
})) as typeof Typography;

interface ViewMessageProps {
  open: boolean;
  handleClose: () => void;
  name: string;
  email: string;
  message: string;
  date: string;
  isRead: boolean;
  handleClick: () => void;
}

export default function ViewMessageModal({
  open,
  handleClose,
  name,
  email,
  message,
  date,
  isRead,
  handleClick,
}: ViewMessageProps) {
  return (
    <CustomModal open={open} handleClose={handleClose}>
      <TitleTypography>{name}</TitleTypography>
      <DescriptionTypography>{email}</DescriptionTypography>
      <DescriptionTypography>{date}</DescriptionTypography>
      <DescriptionTypography>{message}</DescriptionTypography>
      <Grid container item gap={2} justifyContent="center" mt={4}>
        <StyledButton
          buttonText={isRead ? 'Mark as Unread' : 'Mark as Read'}
          onClick={handleClick}
          isLoading={false}
        />
      </Grid>
    </CustomModal>
  );
}
