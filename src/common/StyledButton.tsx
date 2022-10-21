import { styled as materialStyled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import React from 'react';
import Loader from './Loader';

interface ButtonProps {
  textColor: string;
  background: string;
  hoverBackground: string;
  borderColor: string;
  isSmallButton: boolean;
}

const MaterialStyledButton = materialStyled(Button)(
  ({
    textColor,
    background,
    hoverBackground,
    borderColor,
    isSmallButton,
  }: ButtonProps) => ({
    color: textColor,
    background,
    height: isSmallButton ? 37 : 44,
    minWidth: 112,
    padding: '0 20px',
    borderRadius: 12,
    border: `1px solid ${borderColor}`,
    fontWeight: 800,
    fontSize: isSmallButton ? 14 : 16,
    textTransform: 'none',
    '&:hover': {
      color: textColor,
      background: hoverBackground,
    },
    '&:disabled': {
      color: textColor,
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
      textColor={textColor}
      background={background}
      hoverBackground={hoverBackground}
      borderColor={borderColor}
      isSmallButton={isSmallButton}
      onClick={onClick}
      endIcon={isLoading ? undefined : endIcon}
      startIcon={isLoading ? undefined : startIcon}
    >
      {isLoading ? <Loader /> : buttonText}
    </MaterialStyledButton>
  );
}
