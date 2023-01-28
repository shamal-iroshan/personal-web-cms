import React from 'react';
import styled from 'styled-components';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { toast } from 'react-toastify';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledTextContainer = styled.div`
  margin-left: 5px;
`;

const StyledTitle = styled.p`
  font-weight: 700;
  font-size: 14px;
  color: #4169e1;
`;

const StyledDescription = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #4169e1;
`;

export default function successToast(title: string, description: string) {
  return toast(
    <StyledContainer>
      <CheckCircleOutlineOutlinedIcon
        sx={{ fontSize: '18px', color: '#4169e1' }}
      />
      <StyledTextContainer>
        <StyledTitle>{title}</StyledTitle>
        <StyledDescription>{description}</StyledDescription>
      </StyledTextContainer>
    </StyledContainer>,
    { className: 'custom-success' },
  );
}
