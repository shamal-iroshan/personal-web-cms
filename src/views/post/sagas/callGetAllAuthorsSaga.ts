/* eslint-disable import/no-cycle */
import { call, put } from 'redux-saga/effects';
import { collection, getDocs } from 'firebase/firestore';
import { Author } from '../types';
import errorToast from '../../../common/toast/errorToast';
import { postActions } from '../slice/postSlice';
import { db } from '../../../config/firebase';
import { FirebaseCollections } from '../../../utils/constants';

async function callApi() {
  const querySnapShot = await getDocs(
    collection(db, FirebaseCollections.AUTHORS),
  );

  const data = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export default function* callGetAllAuthorsSaga() {
  try {
    const authors: Author[] = yield call(callApi);
    yield put(postActions.getAllAuthorsSuccess(authors));
  } catch (error) {
    console.error('callGetAllAuthorsSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(postActions.getAllAuthorsError('error'));
  }
}
