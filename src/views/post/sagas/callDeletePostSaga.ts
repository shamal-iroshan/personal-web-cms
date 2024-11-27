/* eslint-disable import/no-cycle */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { deleteDoc, doc } from 'firebase/firestore';
import errorToast from '../../../common/toast/errorToast';
import successToast from '../../../common/toast/successToast';
import { postActions } from '../slice/postSlice';
import { db } from '../../../config/firebase';
import { FirebaseCollections } from '../../../utils/constants';

async function callApi(postId: string) {
  await deleteDoc(doc(db, FirebaseCollections.POSTS, postId));
}

export default function* callDeletePostSaga({
  payload,
}: PayloadAction<string>) {
  try {
    yield call(callApi, payload);
    successToast('Success', 'You have successfully deleted.');
    yield put(postActions.deletePostSuccess());
  } catch (error) {
    console.error('callDeletePostSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(postActions.deletePostError('error'));
  }
}
