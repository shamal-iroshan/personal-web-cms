import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

const StyledLoader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;
  min-height: 100%;
  @media screen and (max-width: 899px) {
    min-height: calc(100vh - 105px);
  }
`;

export default function LoadingContainer() {
  return (
    <StyledLoader>
      <BeatLoader color="#718096" margin={2} size={12} />
    </StyledLoader>
  );
}
