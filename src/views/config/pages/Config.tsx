import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/PageTitle';
import { ROUTE_CONFIG } from '../../../common/routes';
import PageWrapper from '../../../common/PageWrapper';
import ConfigTableHeader from '../components/ConfigTableHeader';
import ConfigTable from '../components/ConfigTable';

export default function Config() {
  const navigate = useNavigate();

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
