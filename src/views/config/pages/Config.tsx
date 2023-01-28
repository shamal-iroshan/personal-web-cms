import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/PageTitle';
import { ROUTE_CONFIG } from '../../../common/routes';
import PageWrapper from '../../../common/PageWrapper';
import ConfigTableHeader from '../components/ConfigTableHeader';
import ConfigTable from '../components/ConfigTable';
import { useAppDispatch } from '../../../store/types';
import { configActions } from '../slice/configSlice';

export default function Config() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(configActions.getAllConfigs());
  }, [dispatch]);

  return (
    <>
      <PageTitle
        title="Config"
        actionButtonText="Add"
        action={() => navigate(`${ROUTE_CONFIG}/add`, { replace: false })}
      />
      <PageWrapper>
        <ConfigTableHeader />
        <ConfigTable />
      </PageWrapper>
    </>
  );
}
