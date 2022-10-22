import React from 'react';
import { Field, useFormikContext } from 'formik';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

const StyledLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledLabel = styled.p<{ disabled: boolean }>`
  margin-bottom: 9px;
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  color: #25334f;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const ErrorText = styled.p`
  color: #fc8181;
  font-size: 14px;
  text-align: left;
  margin-top: 2px;
`;

export default function ServicesSelection({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const { setFieldValue, values, errors, setFieldTouched, touched } =
    useFormikContext();
  // @ts-ignore
  const hasError = errors.services;
  // @ts-ignore
  const hasTouched = touched.services;
  // @ts-ignore
  const value = values.services;

  const options: string[] = [];
  const fixedOptions: string[] = [];

  const renderError = (message: string) => <ErrorText>{message}</ErrorText>;

  return (
    <>
      <Box display="flex" flexDirection="column">
        <StyledLabelContainer>
          <StyledLabel disabled={disabled}>Services</StyledLabel>
        </StyledLabelContainer>
      </Box>
      <Autocomplete
        freeSolo
        readOnly={disabled}
        multiple
        id="services-texts"
        value={value}
        onChange={(event, newValue) => {
          setFieldTouched('services');
          setFieldValue('services', [
            // @ts-ignore
            ...new Set([...fixedOptions, ...newValue]),
          ]);
        }}
        onBlur={() => setFieldTouched('services')}
        options={options}
        getOptionLabel={(option) => option}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <Field
            as={TextField}
            placeholder="Enter Services here"
            {...params}
            variant="filled"
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              style: {
                background: '#ffffff',
                border: '1px solid',
                padding: '4px',
                borderColor: '#E3E8EF',
                borderRadius: '12px',
              },
            }}
          />
        )}
        sx={{
          width: '100%',
          color: '#25334f',
          opacity: 0.6,
          '&.Mui-focused': {
            opacity: '1',
          },
        }}
      />
      {hasError && hasTouched && renderError(hasError)}
    </>
  );
}
