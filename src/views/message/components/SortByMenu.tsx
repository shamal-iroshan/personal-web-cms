import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import React from 'react';
import { MessageSortBy } from '../../../utils/constants';

export default function SortByMenu({
  currentSortBy,
  handleSortByChange,
  options,
}: {
  currentSortBy: MessageSortBy;
  handleSortByChange: (e: SelectChangeEvent) => void;
  options: { value: MessageSortBy; label: string }[];
}) {
  return (
    <FormControl sx={{ minWidth: '130px', marginBottom: '24px' }}>
      <Select
        value={currentSortBy}
        onChange={handleSortByChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{
          height: '48px',
          borderRadius: '12px',
          borderColor: '#E3E8EF',
          color: '#25334F',
          opacity: 0.6,
          fontWeight: 400,
          fontSize: '16px',
        }}
      >
        {options.map((el) => (
          <MenuItem key={el.value} value={el.value}>
            {el.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
