import React from 'react';
import styled from 'styled-components';

interface StatusContainerProps {
  labelColor: string;
  dotColor: string;
  bgColor: string;
}

const StatusContainer = styled.div<StatusContainerProps>`
  white-space: nowrap;
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px 8px;
  height: 22px;
  background: ${({ bgColor }) => bgColor};
  border-radius: 16px;
  div {
    width: 6px;
    height: 6px;
    border-radius: 100%;
    margin-right: 7px;
    background-color: ${({ dotColor }) => dotColor};
  }
  span {
    font-weight: 500;
    font-size: 12px;
    color: ${({ labelColor }) => labelColor};
  }
`;

interface StatusLabelProps {
  label: string;
  labelColor: string;
  dotColor: string;
  bgColor: string;
}

export default function StatusLabel(props: StatusLabelProps) {
  const { label, labelColor, dotColor, bgColor } = props;
  return (
    <StatusContainer
      labelColor={labelColor}
      dotColor={dotColor}
      bgColor={bgColor}
    >
      <div />
      <span>{label}</span>
    </StatusContainer>
  );
}
