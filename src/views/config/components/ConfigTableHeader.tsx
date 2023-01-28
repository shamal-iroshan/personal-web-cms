import React from 'react';
import TableHeader from '../../../common/TableHeader';
import { useAppSelector } from '../../../store/types';
import { selectAllConfigs } from '../slice/configSlice';

export default function ConfigTableHeader() {
  const configs = useAppSelector(selectAllConfigs);

  return (
    <TableHeader
      title="Configs"
      total={configs?.total}
      description="Mange website configs from here."
    />
  );
}
