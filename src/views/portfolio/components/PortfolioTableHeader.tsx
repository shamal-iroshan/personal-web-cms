import React from 'react';
import TableHeader from '../../../common/TableHeader';
import { useAppSelector } from '../../../store/types';

export default function PortfolioTableHeader() {
  const { total } = useAppSelector(
    (state) => state.portfolioReducer.allPortfolios,
  );

  return (
    <TableHeader
      title="Portfolio"
      total={total}
      description="Mange portfolio content from here."
    />
  );
}
