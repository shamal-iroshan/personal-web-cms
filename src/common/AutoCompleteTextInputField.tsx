import { Field, useFormikContext } from 'formik';
import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  margin-bottom: 8px;
`;

interface AutoCompleteTextInputFieldProps {
  label?: string;
  name: string;
  required?: boolean;
  markAsRequired?: boolean;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  labelColor?: string;
  options: string[];
}

export default function AutoCompleteTextInputField(
  inputProps: AutoCompleteTextInputFieldProps,
) {
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
  } = inputProps;
  const { setFieldValue, values, errors, setFieldTouched, touched } =
    useFormikContext();
  const renderError = (message: string) => <ErrorText>{message}</ErrorText>;
  const [searchBreed, setSearchBreed] = React.useState('');
  // @ts-ignore
  const hasError = errors[name];
  // @ts-ignore
  const hasTouched = touched[name];
  // @ts-ignore
  const value = values[name];

  return (
    <>
      {label && (
        <StyledLabelContainer>
          <StyledLabel labelColor={labelColor} disabled={disabled}>
            {label}
          </StyledLabel>
          {markAsRequired && <StyledSpan>*</StyledSpan>}
        </StyledLabelContainer>
      )}
      <Autocomplete
        readOnly={disabled}
        value={value}
        // @ts-ignore
        onChange={(event: unknown, newValue: string) => {
          setFieldValue(name, newValue);
        }}
        inputValue={searchBreed}
        onBlur={() => setFieldTouched(name)}
        onInputChange={(event, newInputValue) => {
          setSearchBreed(newInputValue);
        }}
        options={options}
        getOptionLabel={(option: string) => option}
        sx={{
          width: '100%',
          color: '#25334f',
          opacity: 0.6,
          '&.Mui-focused': {
            opacity: '1',
          },
        }}
        renderOption={(props, option) => (
          <li {...props} key={option}>
            {option}
          </li>
        )}
        renderInput={(params) => (
          <Field
            as={TextField}
            placeholder={placeholder}
            {...params}
            variant="filled"
            required={required}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              style: {
                background: '#ffffff',
                border: '1px solid',
                height: '48px',
                padding: '0 12px',
                borderColor: '#E3E8EF',
                borderRadius: '12px',
              },
            }}
          />
        )}
      />
      {hint && !hasError && <StyledHint>{hint}</StyledHint>}
      {hasError && hasTouched && renderError(hasError)}
    </>
  );
}
