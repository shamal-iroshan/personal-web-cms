import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/PageTitle';
import { ROUTE_PORTFOLIO } from '../../../common/routes';
import PageWrapper from '../../../common/PageWrapper';
import PortfolioTableHeader from '../components/PortfolioTableHeader';
import PortfolioTable from '../components/PortfolioTable';
import PortfolioTableFooter from '../components/PortfolioTableFooter';

export default function Portfolio() {
  const navigate = useNavigate();

  return (
    <>
      <PageTitle
        title="Portfolio"
        actionButtonText="Add"
        action={() => navigate(`${ROUTE_PORTFOLIO}/add`, { replace: false })}
      />
      <PageWrapper>
        <PortfolioTableHeader />
        <PortfolioTable />
        <PortfolioTableFooter />
      </PageWrapper>
    </>
  );
}
