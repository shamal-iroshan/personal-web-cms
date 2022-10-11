import { Field, useFormikContext } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import { InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { styled as materialStyled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

const MaterialStyledTextField = materialStyled(TextField)({
  width: '100%',
  opacity: '0.6',
  '&>div': {
    gap: '10px',
    height: '48px',
    borderRadius: '12px',
    fontWeight: '400',
    fontSize: '16px',
    color: ' #25334f',
    outline: 'none',
    backgroundColor: 'white',
    padding: 0,
    '& fieldset': {
      border: '1px solid #e3e8ef !important',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #e3e8ef !important',
    },
    '&:hover fieldset': {
      border: '1px solid #e3e8ef !important',
    },
  },
  '&>div>input': {
    fontWeight: '400',
    fontSize: '16px !important',
    color: ' #25334f',
    padding: '13px 14px',
  },
}) as typeof TextField;

const ErrorText = styled.p`
  color: #fc8181;
  font-size: 14px;
  text-align: left;
  margin-top: 2px;
`;

const StyledSpan = styled.span`
  color: #fc8181;
  font-size: 14px;
  margin-bottom: 8px;
  margin-left: 4px;
`;

const StyledLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledHint = styled.p`
  color: #a0aec0;
  font-size: 14px;
  text-align: left;
  font-weight: 400;
  margin-top: 2px;
`;

interface LabelProps {
  labelColor: string;
}

const StyledLabel = styled.p<LabelProps>`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  color: ${({ labelColor }) => labelColor};
  margin-bottom: 8px;
`;

interface Props {
  label?: string;
  name: string;
  required?: boolean;
  markAsRequired?: boolean;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  labelColor?: string;
}

export default function PasswordInputField(props: Props) {
  const {
    label,
    name,
    required = false,
    markAsRequired = false,
    placeholder = '',
    hint = '',
    disabled = false,
    labelColor = '#25334f',
  } = props;
  const { errors, touched, values, handleChange, handleBlur } =
    useFormikContext();
  const [showPassword, setShowPassword] = useState(false);
  const renderError = (message: string) => <ErrorText>{message}</ErrorText>;
  // @ts-ignore
  const hasError = errors[name];
  // @ts-ignore
  const hasTouched = touched[name];
  // @ts-ignore
  const value = values[name];

  const handleIconClick = () => setShowPassword(!showPassword);

  return (
    <>
      {label && (
        <StyledLabelContainer>
          <StyledLabel labelColor={labelColor}>{label}</StyledLabel>
          {markAsRequired && <StyledSpan>*</StyledSpan>}
        </StyledLabelContainer>
      )}
      <Field
        validateOnBlur
        validateOnChange
        render={() => (
          <MaterialStyledTextField
            name={name}
            onChange={handleChange}
            value={value}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            type={showPassword ? 'text' : 'password'}
            required={required}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  sx={{
                    position: 'absolute',
                    right: 5,
                    opacity: 0.6,
                  }}
                  position="end"
                >
                  <IconButton onClick={handleIconClick}>
                    {showPassword ? (
                      <VisibilityOffIcon sx={{ cursor: 'pointer' }} />
                    ) : (
                      <VisibilityIcon sx={{ cursor: 'pointer' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      {hint && !hasError && <StyledHint>{hint}</StyledHint>}
      {hasError && hasTouched && renderError(hasError)}
    </>
  );
}
