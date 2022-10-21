import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

interface StyledLoaderProps {
  isPetProfileView?: boolean;
}

const StyledLoader = styled.div<StyledLoaderProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;
  min-height: ${({ isPetProfileView }) =>
    isPetProfileView ? 'calc(100vh - 417px)' : '100%'};
  @media screen and (max-width: 899px) {
    min-height: ${({ isPetProfileView }) =>
      isPetProfileView ? 'calc(100vh - 456px)' : 'calc(100vh - 105px)'};
  }
`;

export default function LoadingContainer({
  isPetProfileView,
}: {
  isPetProfileView?: boolean;
}) {
  return (
    <StyledLoader isPetProfileView={isPetProfileView}>
      <BeatLoader color="#718096" margin={2} size={12} />
    </StyledLoader>
  );
}
