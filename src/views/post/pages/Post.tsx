import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/PageTitle';
import { ROUTE_POST } from '../../../common/routes';
import PageWrapper from '../../../common/PageWrapper';
import PostTableHeader from '../components/PostTableHeader';
import PostTable from '../components/PostTable';
import PostTableFooter from '../components/PostTableFooter';
import { useAppDispatch, useAppSelector } from '../../../store/types';
import { selectIdToken } from '../../signIn/slice/signInSlice';
import { postActions } from '../slice/postSlice';

export default function Portfolio() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const idToken = useAppSelector(selectIdToken);

  useEffect(() => {
    if (idToken) {
      dispatch(postActions.getAllPosts());
    }
  }, [dispatch, idToken]);

  return (
    <>
      <PageTitle
        title="Post"
        actionButtonText="Add"
        action={() => navigate(`${ROUTE_POST}/add`, { replace: false })}
      />
      <PageWrapper>
        <PostTableHeader />
        <PostTable />
        <PostTableFooter />
      </PageWrapper>
    </>
  );
}
