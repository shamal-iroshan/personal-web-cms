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
  } = props;

  const textColor = '#ffffff';
  const background = isError ? '#FC8181' : '#4169e1';
  const hoverBackground = isError ? 'rgba(252, 129, 129, 0.9)' : '#164cee';
  const borderColor = isError ? '#FC8181' : '#0d358c';

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
