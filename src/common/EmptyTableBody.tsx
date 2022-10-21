import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { EmptyText } from './StyledBasicComponents';

export default function EmptyTableBody({
  message,
  colSpan,
}: {
  message: string;
  colSpan: number;
}) {
  return (
    <TableRow
      key="empty"
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        height: '216px',
      }}
    >
      <TableCell align="center" colSpan={colSpan}>
        <EmptyText>{message}</EmptyText>
      </TableCell>
    </TableRow>
  );
}
