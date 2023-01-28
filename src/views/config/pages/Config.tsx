import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/PageTitle';
import { ROUTE_CONFIG } from '../../../common/routes';
import PageWrapper from '../../../common/PageWrapper';
import ConfigTableHeader from '../components/ConfigTableHeader';
import ConfigTable from '../components/ConfigTable';
import { useAppDispatch, useAppSelector } from '../../../store/types';
import { configActions } from '../slice/configSlice';
import { selectIdToken } from '../../signIn/slice/signInSlice';

export default function Config() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const idToken = useAppSelector(selectIdToken);

  useEffect(() => {
    if (idToken) {
      dispatch(configActions.getAllConfigs());
    }
  }, [dispatch, idToken]);

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
