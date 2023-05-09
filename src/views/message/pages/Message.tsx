import React, { useEffect } from 'react';
import PageTitle from '../../../common/PageTitle';
import PageWrapper from '../../../common/PageWrapper';
import MessageTableHeader from '../components/MessageTableHeader';
import MessageTableFooter from '../components/MessageTableFooter';
import MessageTable from '../components/MessageTable';
import { useAppDispatch, useAppSelector } from '../../../store/types';
import { selectIdToken } from '../../signIn/slice/signInSlice';
import { messageActions } from '../slice/messageSlice';

export default function Message() {
  const dispatch = useAppDispatch();
  const idToken = useAppSelector(selectIdToken);

  useEffect(() => {
    if (idToken) {
      dispatch(messageActions.getAllMessages());
    }
  }, [dispatch, idToken]);

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
