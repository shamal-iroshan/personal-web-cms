import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';
import OutlinedInput from '@mui/material/OutlinedInput';
import StyledButton from '../../../common/StyledButton';
import { Config } from '../types';

const StyledLabel = styled.p`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  color: #25334f;
  margin-bottom: 8px;

  span {
    font-weight: 400;
    font-size: 14px;
    color: #718096;
    margin-bottom: 8px;
  }
`;

const EmptyText = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #718096;
  margin-bottom: 16px;
`;

const DetailText = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #718096;
  margin-bottom: 6px;
  padding: 0 12px;

  span {
    font-weight: 700;
    font-size: 14px;
    color: #636363;
  }
`;

export default function ProgrammingSkills() {
  const { values, setFieldValue } = useFormikContext<Config>();
  const [name, setName] = useState('');
  const [value, setValue] = useState(0);

  return (
    <Grid item xs={12}>
      <Box display="flex" flexDirection="row">
        <StyledLabel>Programming Skills</StyledLabel>
      </Box>
      {(values?.programmingSkills || []).length === 0 && (
        <EmptyText>No Programming Skills</EmptyText>
      )}
      {values?.programmingSkills?.map((el) => (
        <Box
          key={el.name}
          mb={2}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{
            backgroundColor: '#F8F9FA',
            padding: '12px',
            borderRadius: '12px',
          }}
        >
          <DetailText>
            <span>Name:</span> {el.name}
          </DetailText>
          <DetailText>
            <span>Value:</span> {el.value}
          </DetailText>
        </Box>
      ))}
      <Grid item md={6} xs={12}>
        <Box display="flex" flexDirection="row" gap={1}>
          <OutlinedInput
            sx={{
              fontWeight: '400',
              fontSize: '16px',
              textAlign: 'center',
              height: '48px',
              width: '50%',
              padding: '12px 12px',
              borderColor: '#E3E8EF',
              borderRadius: '12px',

              'fieldset.MuiOutlinedInput-notchedOutline': {
                border: '1px solid #E3E8EF !important',
              },
            }}
            placeholder="Enter programming skill name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <OutlinedInput
            sx={{
              fontWeight: '400',
              fontSize: '16px',
              textAlign: 'center',
              height: '48px',
              padding: '12px 12px',
              borderColor: '#E3E8EF',
              borderRadius: '12px',

              'fieldset.MuiOutlinedInput-notchedOutline': {
                border: '1px solid #E3E8EF !important',
              },
            }}
            placeholder="Enter programming skill value here"
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
          <StyledButton
            buttonText="Add"
            onClick={() => {
              const temp = values.programmingSkills;
              temp.push({ name, value });
              setFieldValue('programmingSkills', temp);
              setName('');
              setValue(0);
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
