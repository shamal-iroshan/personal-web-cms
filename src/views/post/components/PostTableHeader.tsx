import React from 'react';
import TableHeader from '../../../common/TableHeader';
import { useAppSelector } from '../../../store/types';

export default function PortfolioTableHeader() {
  const { total } = useAppSelector((state) => state.postReducer.allPosts);

  return (
    <TableHeader
      title="Post"
      total={total}
      description="Mange post content from here."
    />
  );
}
