import { styled as materialStyled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import React from 'react';
import Loader from './Loader';

interface ButtonProps {
  textcolor: string;
  background: string;
  hoverbackground: string;
  bordercolor: string;
  issmallbutton: boolean;
}

const MaterialStyledButton = materialStyled(Button)(
  ({
    textcolor,
    background,
    hoverbackground,
    bordercolor,
    issmallbutton,
  }: ButtonProps) => ({
    color: textcolor,
    background,
    height: issmallbutton ? 37 : 44,
    minWidth: 112,
    padding: '0 20px',
    borderRadius: 12,
    border: `1px solid ${bordercolor}`,
    fontWeight: 800,
    fontSize: issmallbutton ? 14 : 16,
    textTransform: 'none',
    '&:hover': {
      color: textcolor,
      background: hoverbackground,
    },
    '&:disabled': {
      color: textcolor,
      background,
      opacity: 0.6,
    },
  }),
);

type TransparentBlackButtonProps = {
  buttonText: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'button';
  endIcon?: JSX.Element;
  startIcon?: JSX.Element;
  fullWidth?: boolean;
  isSmallButton?: boolean;
  isError?: boolean;
  isErrorOutlined?: boolean;
};

export default function StyledButton(props: TransparentBlackButtonProps) {
  const {
    buttonText,
    onClick,
    isLoading = false,
    disabled = false,
    type = 'button',
    endIcon,
    startIcon,
    fullWidth = false,
    isSmallButton = false,
    isError = false,
    isErrorOutlined = false,
  } = props;

  let textColor = '#ffffff';
  let background = '#4169e1';
  let hoverBackground = '#164cee';
  let borderColor = '#0d358c';

  if (isError) {
    textColor = '#ffffff';
    background = '#FC8181';
    hoverBackground = 'rgba(252, 129, 129, 0.9)';
    borderColor = '#FC8181';
  }

  if (isErrorOutlined) {
    textColor = '#FC8181';
    background = '#ffffff';
    hoverBackground = '#faf5f5';
    borderColor = '#FC8181';
  }

  return (
    <MaterialStyledButton
      disableElevation
      fullWidth={fullWidth}
      type={type}
      disabled={disabled || isLoading}
      textcolor={textColor}
      background={background}
      hoverbackground={hoverBackground}
      bordercolor={borderColor}
      issmallbutton={isSmallButton}
      onClick={onClick}
      endIcon={isLoading ? undefined : endIcon}
      startIcon={isLoading ? undefined : startIcon}
    >
      {isLoading ? <Loader /> : buttonText}
    </MaterialStyledButton>
  );
}
