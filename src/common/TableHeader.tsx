import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TableHeaderLabel } from './StyledBasicComponents';

const TitleText = styled.h2`
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  color: #25334f;
`;

const SubTitleText = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #25334f;
  margin-top: 4px;
`;

interface TableHeaderProps {
  title: string;
  total: number;
  description?: string;
}

export default function TableHeader({
  title,
  total,
  description = '',
}: TableHeaderProps) {
  return (
    <Grid
      container
      item
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
      marginBottom={3}
    >
      <Box>
        <Box display="flex" flexDirection="row">
          <TitleText>{title}</TitleText>
          <TableHeaderLabel>{total} total</TableHeaderLabel>
        </Box>
        <SubTitleText>{description}</SubTitleText>
      </Box>
    </Grid>
  );
}
