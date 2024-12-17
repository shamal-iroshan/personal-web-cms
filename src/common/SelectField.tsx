import { ErrorMessage, Field, useFormikContext } from 'formik';
import React from 'react';
import styled from 'styled-components';

export const StyledSelect = styled.select`
  padding: 12px 20px;
  gap: 10px;
  width: 100%;
  height: 48px;
  border: 1px solid #e3e8ef;
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  color: #25334f;
  opacity: 0.6;
  background-color: white;
  appearance: none; /* Hide the default dropdown arrow */
  -webkit-appearance: none; /* For Safari */
  -moz-appearance: none; /* For Firefox */
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>');
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-size: 16px;
  &:focus {
    outline: none;
    opacity: 1;
  }
  &::placeholder {
    color: #25334f;
    opacity: 0.6;
  }
`;

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
  disabled: boolean;
}

const StyledLabel = styled.p<LabelProps>`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  color: ${({ labelColor }) => labelColor};
  margin-bottom: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
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
  options: Array<{ value: string; label: string }>;
}

export default function SelectField(props: Props) {
  const {
    label,
    name,
    required = false,
    markAsRequired = false,
    placeholder = '',
    hint = '',
    disabled = false,
    labelColor = '#25334f',
    options,
  } = props;
  const renderError = (message: string) => <ErrorText>{message}</ErrorText>;
  const { errors } = useFormikContext();
  // @ts-ignore
  const hasError = errors[name];

  return (
    <>
      {label && (
        <StyledLabelContainer>
          <StyledLabel labelColor={labelColor} disabled={disabled}>
            {label}
          </StyledLabel>
          {!disabled && markAsRequired && <StyledSpan>*</StyledSpan>}
        </StyledLabelContainer>
      )}
      <Field
        as={StyledSelect}
        placeholder={placeholder}
        required={required}
        name={name}
        disabled={disabled}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      {hint && !hasError && <StyledHint>{hint}</StyledHint>}
      <ErrorMessage name={name} render={renderError} />
    </>
  );
}
