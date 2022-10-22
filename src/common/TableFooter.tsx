import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid';
import React from 'react';
import { styled as materialStyled, Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useMediaQuery } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const MaterialPaginationButton = materialStyled(Button)({
  color: '#37A794',
  fontWeight: 700,
  fontSize: 14,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '&:disabled': {
    color: '#37A794',
    opacity: 0.5,
  },
}) as typeof Button;

const TableNumber = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: #718096;
  align-self: center;
`;

interface TableFooterProps {
  footerSummaryLabel: string;
  total: number;
  totalPages: number;
}

export default function TableFooter({
  footerSummaryLabel,
  total,
  totalPages,
}: TableFooterProps) {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
  const currentLimit = parseInt(searchParams.get('limit') ?? '10', 10);
  const startPage =
    total === 0 ? `` : `${(currentPage - 1) * currentLimit + 1}-`;
  const endPage = Math.min(currentPage * currentLimit, total);
  const footerSummary = `${footerSummaryLabel} ${startPage}${endPage} of ${total}`;

  const handleNext = () => {
    searchParams.set('page', String(currentPage + 1));
    setSearchParams(searchParams);
  };

  const handlePrevious = () => {
    searchParams.set('page', String(currentPage - 1));
    setSearchParams(searchParams);
  };

  return (
    <Grid
      container
      item
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
      sx={(theme) => ({
        marginTop: '24px',
        [theme.breakpoints.down('md')]: {
          marginTop: '16px',
        },
      })}
    >
      <MaterialPaginationButton
        disableRipple
        disabled={currentPage === 1}
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={handlePrevious}
      >
        {!isSmallScreen && 'Previous'}
      </MaterialPaginationButton>
      <TableNumber>{footerSummary}</TableNumber>
      <MaterialPaginationButton
        disableRipple
        disabled={
          currentPage === totalPages || totalPages === 1 || totalPages === 0
        }
        variant="text"
        endIcon={<ArrowForwardIcon />}
        onClick={handleNext}
      >
        {!isSmallScreen && 'Next'}
      </MaterialPaginationButton>
    </Grid>
  );
}
