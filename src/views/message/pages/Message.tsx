import React from 'react';
import PageTitle from '../../../common/PageTitle';
import PageWrapper from '../../../common/PageWrapper';
import MessageTableHeader from '../components/MessageTableHeader';
import MessageTableFooter from '../components/MessageTableFooter';
import MessageTable from '../components/MessageTable';

export default function Message() {
  return (
    <>
      <PageTitle title="Message" />
      <PageWrapper>
        <MessageTableHeader />
        <MessageTable />
        <MessageTableFooter />
      </PageWrapper>
    </>
  );
}
