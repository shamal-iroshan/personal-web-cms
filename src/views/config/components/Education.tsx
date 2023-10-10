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

export default function Education() {
  const { values, setFieldValue } = useFormikContext<Config>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');

  return (
    <Grid item xs={12}>
      <Box display="flex" flexDirection="row">
        <StyledLabel>Education</StyledLabel>
      </Box>
      {(values?.educations || []).length === 0 && (
        <EmptyText>No Education Details</EmptyText>
      )}
      {values?.educations?.map((el) => (
        <Box
          key={el.title}
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
            <span>Title:</span> {el.title}
          </DetailText>
          <DetailText>
            <span>Description:</span> {el.description}
          </DetailText>
          <DetailText>
            <span>Year:</span> {el.year}
          </DetailText>
        </Box>
      ))}
      <Grid item md={12}>
        <Box
          gap={1}
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'row',
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
            },
          })}
        >
          <OutlinedInput
            sx={(theme) => ({
              fontWeight: '400',
              fontSize: '16px',
              textAlign: 'center',
              height: '48px',
              width: '30%',
              padding: '12px 12px',
              borderColor: '#E3E8EF',
              borderRadius: '12px',

              'fieldset.MuiOutlinedInput-notchedOutline': {
                border: '1px solid #E3E8EF !important',
              },
              [theme.breakpoints.down('md')]: {
                width: '100%',
              },
            })}
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <OutlinedInput
            sx={(theme) => ({
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
              [theme.breakpoints.down('md')]: {
                width: '100%',
              },
            })}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <OutlinedInput
            sx={(theme) => ({
              fontWeight: '400',
              fontSize: '16px',
              textAlign: 'center',
              height: '48px',
              width: '30%',
              padding: '12px 12px',
              borderColor: '#E3E8EF',
              borderRadius: '12px',

              'fieldset.MuiOutlinedInput-notchedOutline': {
                border: '1px solid #E3E8EF !important',
              },
              [theme.breakpoints.down('md')]: {
                width: '100%',
              },
            })}
            placeholder="Enter year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <StyledButton
            buttonText="Add"
            outlined
            onClick={() => {
              const temp = [...values.educations];
              temp.push({ title, description, year });
              setFieldValue('education', temp);
              setTitle('');
              setDescription('');
              setYear('');
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
