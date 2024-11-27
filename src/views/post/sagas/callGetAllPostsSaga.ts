/* eslint-disable import/no-cycle */
import { call, put } from 'redux-saga/effects';
import { collection, getDocs } from 'firebase/firestore';
import { AllPosts } from '../types';
import errorToast from '../../../common/toast/errorToast';
import { postActions } from '../slice/postSlice';
import { db } from '../../../config/firebase';
import { FirebaseCollections } from '../../../utils/constants';

async function callApi() {
  const querySnapShot = await getDocs(
    collection(db, FirebaseCollections.POSTS),
  );

  const rawPosts = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    total: rawPosts.length,
    data: rawPosts,
  };
}

export default function* callGetAllPostsSaga() {
  try {
    const posts: AllPosts = yield call(callApi);
    yield put(postActions.getAllPostsSuccess(posts));
  } catch (error) {
    console.error('callGetAllPostsSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(postActions.getAllPostsError('error'));
  }
}
