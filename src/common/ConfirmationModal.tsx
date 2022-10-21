import React from 'react';
import { Grid, OutlinedInput, Typography } from '@mui/material';
import { styled as materialStyled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import CustomModal from './CustomModal';
import StyledButton from './StyledButton';

interface ITitleProps {
  isRed: boolean;
}

const TitleTypography = materialStyled(Typography)(
  ({ isRed }: ITitleProps) => ({
    fontWeight: 700,
    fontSize: 18,
    color: isRed ? '#F56565' : '#37A794',
    marginTop: 24,
    textAlign: 'center',
  }),
);

const DescriptionTypography = materialStyled(Typography)(() => ({
  fontWeight: 400,
  fontSize: 14,
  color: '#25334F',
  marginTop: 12,
  textAlign: 'center',
})) as typeof Typography;

interface IsCancellationDiv {
  isRed: boolean;
}

const StyledIconOuterContainer = styled.div<IsCancellationDiv>`
  width: 64px;
  height: 64px;
  background: ${({ isRed }) => (isRed ? '#FEF3F2' : '#D1FADF')};
  border-radius: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIconInnerContainer = styled.div<IsCancellationDiv>`
  width: 45px;
  height: 45px;
  background: ${({ isRed }) => (isRed ? '#FEE4E2' : '#D1FADF')};
  border-radius: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ConfirmationModalProps {
  open: boolean;
  handleClose: () => void;
  modalTitle?: string;
  modalDescription?: string;
  isCancellationModal?: boolean;
  backButtonText?: string;
  backButtonIsLoading?: boolean;
  backButtonAction?: () => void;
  continueButtonText?: string;
  continueButtonIsLoading?: boolean;
  continueButtonAction?: () => void;
  showReason?: boolean;
  reasonValue?: string;
  onChangeReason?: (arg0: React.ChangeEvent<HTMLInputElement>) => void;
  reasonPlaceHolder?: string;
}

export default function ConfirmationModal(props: ConfirmationModalProps) {
  const {
    open,
    handleClose,
    modalTitle,
    modalDescription,
    isCancellationModal = false,
    backButtonText,
    backButtonIsLoading = false,
    backButtonAction,
    continueButtonText,
    continueButtonIsLoading = false,
    continueButtonAction,
    showReason = false,
    reasonValue,
    onChangeReason,
    reasonPlaceHolder,
  } = props;

  return (
    <CustomModal open={open} handleClose={handleClose}>
      <StyledIconOuterContainer isRed={isCancellationModal}>
        <StyledIconInnerContainer isRed={isCancellationModal}>
          {isCancellationModal ? (
            <ErrorOutlineIcon
              sx={{
                color: '#D92D20',
                fontSize: '32px',
                marginLeft: '2px',
                marginBottom: '1px',
              }}
            />
          ) : (
            <TaskAltIcon sx={{ color: '#039855', fontSize: '32px' }} />
          )}
        </StyledIconInnerContainer>
      </StyledIconOuterContainer>
      <TitleTypography isRed={isCancellationModal}>
        {modalTitle}
      </TitleTypography>
      <DescriptionTypography>{modalDescription}</DescriptionTypography>
      <Box width="100%">
        {showReason && (
          <Grid container mt={3}>
            <OutlinedInput
              sx={{
                fontWeight: '400',
                fontSize: '16px',
                padding: '12px 20px',
                borderColor: '#E3E8EF',
                borderRadius: '12px',

                'fieldset.MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #E3E8EF !important',
                },
              }}
              fullWidth
              multiline
              minRows="2"
              maxRows="2"
              placeholder={reasonPlaceHolder}
              value={reasonValue}
              onChange={onChangeReason}
            />
          </Grid>
        )}
      </Box>
      <Grid container item gap={2} justifyContent="center" mt={4}>
        {backButtonText && (
          <StyledButton
            isErrorOutlined
            buttonText={backButtonText}
            onClick={backButtonAction}
            isLoading={backButtonIsLoading}
          />
        )}
        {continueButtonText && (
          <StyledButton
            isError
            buttonText={continueButtonText}
            onClick={continueButtonAction}
            isLoading={continueButtonIsLoading}
          />
        )}
      </Grid>
    </CustomModal>
  );
}
