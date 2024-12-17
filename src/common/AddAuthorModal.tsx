import React from 'react';
import { Box, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import styled from 'styled-components';
import StyledButton from './StyledButton';
import { useAppDispatch } from '../store/types';
import { postActions } from '../views/post/slice/postSlice';

interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
}

export const StyledInput = styled.input`
  padding: 12px 20px;
  gap: 10px;
  width: 100%;
  height: 48px;
  border: 1px solid #e3e8ef;
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  color: #25334f;
  opacity: 0.6;
  background-color: white;
  &:focus {
    outline: none;
    opacity: 1;
  }
  &::placeholder {
    color: #25334f;
    opacity: 0.6;
  }
`;

const StyledLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledSpan = styled.span`
  color: #fc8181;
  font-size: 14px;
  margin-bottom: 8px;
  margin-left: 4px;
`;

const StyledLabel = styled.p`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  color: #25334f;
  margin-bottom: 8px;
`;

export default function AddAuthorModal({
  open,
  handleClose,
}: CustomModalProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState('');
  const [image, setImage] = React.useState('');

  const onClose = () => {
    setName('');
    setImage('');
    handleClose();
  };

  const handleSave = () => {
    if (name === '') {
      return;
    }

    dispatch(postActions.addAuthor({ name, image }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      className="confirm-modal"
    >
      <Grid
        container
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="start"
        gap={2}
        sx={(theme) => ({
          width: 'unset',
          outline: 'none',
          minWidth: 600,
          maxWidth: 600,
          padding: '40px',
          backgroundColor: '#ffffff',
          [theme.breakpoints.down('md')]: {
            minWidth: '100%',
            padding: '24px',
          },
        })}
      >
        <StyledLabelContainer>
          <StyledLabel>Name</StyledLabel>
          <StyledSpan>*</StyledSpan>
        </StyledLabelContainer>
        <StyledInput value={name} onChange={(e) => setName(e.target.value)} />
        <StyledLabelContainer>
          <StyledLabel>Image Link</StyledLabel>
        </StyledLabelContainer>
        <StyledInput value={image} onChange={(e) => setImage(e.target.value)} />
        <Box
          gap={2}
          mt={4}
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="end"
          sx={{ width: '100%' }}
        >
          <StyledButton buttonText="Cancel" outlined onClick={onClose} />
          <StyledButton buttonText="Save" onClick={handleSave} />
        </Box>
      </Grid>
    </Dialog>
  );
}
