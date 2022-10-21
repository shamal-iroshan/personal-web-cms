import React from 'react';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

import Stack from '@mui/material/Stack';

export default function LeftDrawerSkeleton() {
  return (
    <Stack flexDirection="column">
      <Stack flexDirection="row" alignItems="center">
        <Skeleton
          variant="circular"
          width={23}
          height={23}
          sx={{ marginLeft: '28px' }}
        />
        <Skeleton
          variant="rectangular"
          width={120}
          height={24}
          sx={{ margin: '11px 0 11px 16px' }}
        />
      </Stack>
      <Stack flexDirection="row" alignItems="center">
        <Skeleton
          variant="circular"
          width={23}
          height={23}
          sx={{ marginLeft: '28px' }}
        />
        <Skeleton
          variant="rectangular"
          width={120}
          height={24}
          sx={{ margin: '11px 0 11px 16px' }}
        />
      </Stack>
      <Stack flexDirection="row" alignItems="center">
        <Skeleton
          variant="circular"
          width={23}
          height={23}
          sx={{ marginLeft: '28px' }}
        />
        <Skeleton
          variant="rectangular"
          width={120}
          height={24}
          sx={{ margin: '11px 0 11px 16px' }}
        />
      </Stack>
      <Stack flexDirection="row" alignItems="center">
        <Skeleton
          variant="circular"
          width={23}
          height={23}
          sx={{ marginLeft: '28px' }}
        />
        <Skeleton
          variant="rectangular"
          width={120}
          height={24}
          sx={{ margin: '11px 0 11px 16px' }}
        />
      </Stack>
      <Stack flexDirection="row" alignItems="center">
        <Skeleton
          variant="circular"
          width={23}
          height={23}
          sx={{ marginLeft: '28px' }}
        />
        <Skeleton
          variant="rectangular"
          width={120}
          height={24}
          sx={{ margin: '11px 0 11px 16px' }}
        />
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Stack flexDirection="row" alignItems="center">
        <Skeleton
          variant="circular"
          width={23}
          height={23}
          sx={{ marginLeft: '28px' }}
        />
        <Skeleton
          variant="rectangular"
          width={120}
          height={24}
          sx={{ margin: '11px 0 11px 16px' }}
        />
      </Stack>
      <Stack flexDirection="row" alignItems="center">
        <Skeleton
          variant="circular"
          width={23}
          height={23}
          sx={{ marginLeft: '28px' }}
        />
        <Skeleton
          variant="rectangular"
          width={120}
          height={24}
          sx={{ margin: '11px 0 11px 16px' }}
        />
      </Stack>
    </Stack>
  );
}
