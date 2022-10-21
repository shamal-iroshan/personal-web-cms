import React, { ReactNode } from 'react';
import styled from 'styled-components';
import CheckMarkIcon from '../assets/images/svg/check-mark.svg';

const CheckBoxInput = styled.input`
  opacity: 0;
  position: relative;
  display: none;
`;

interface CheckBoxLabelProps {
  checked: boolean;
}

const CheckBoxLabel = styled.label<CheckBoxLabelProps>`
  position: relative;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  color: #344054;
  padding-left: 24px;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 16px;
    height: 16px;
    outline: ${(props) =>
      props.checked ? '1px solid #37a794' : '1px solid #d0d5dd'};
    border-radius: 4px;
    background: ${(props) =>
      props.checked ? `url(${CheckMarkIcon})` : '#ffffff'};
    background-size: contain;
  }
`;

interface Props {
  text: string | ReactNode;
  setChecked: (b: boolean) => void;
  checked: boolean;
}

export default function CheckBoxField(props: Props) {
  const { setChecked, checked, text } = props;
  return (
    <div>
      <CheckBoxInput type="checkbox" />
      <CheckBoxLabel
        className="prevent-select"
        onClick={() => setChecked(!checked)}
        checked={checked}
      >
        {text}
      </CheckBoxLabel>
    </div>
  );
}
