import React from 'react';
import { useMediaQuery } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';

export default function AppBarSkeleton() {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  return (
    <Stack flexDirection="row" alignItems="center">
      {!isSmallScreen && (
        <Skeleton
          variant="circular"
          width={24}
          height={24}
          sx={{ marginRight: '36px' }}
        />
      )}
      {!isSmallScreen && (
        <Skeleton
          variant="circular"
          width={24}
          height={24}
          sx={{ marginRight: '36px' }}
        />
      )}
      <Skeleton variant="circular" width={40} height={40} />
      {!isSmallScreen && (
        <Skeleton
          variant="rectangular"
          width={170}
          height={27}
          sx={{ marginLeft: '12px' }}
        />
      )}
    </Stack>
  );
}
