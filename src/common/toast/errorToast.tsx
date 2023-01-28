import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

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
  color: #d92d20;
`;

const StyledDescription = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #d92d20;
`;

export default function errorToast(title: string, description: string) {
  return toast(
    <StyledContainer>
      <ErrorOutlineOutlinedIcon sx={{ fontSize: '18px', color: '#D92D20' }} />
      <StyledTextContainer>
        <StyledTitle>{title}</StyledTitle>
        <StyledDescription>{description}</StyledDescription>
      </StyledTextContainer>
    </StyledContainer>,
    { className: 'custom-error' },
  );
}
