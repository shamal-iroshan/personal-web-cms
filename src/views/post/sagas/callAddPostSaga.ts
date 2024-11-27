/* eslint-disable import/no-cycle */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { addDoc, collection } from 'firebase/firestore';
import { Post } from '../types';
import errorToast from '../../../common/toast/errorToast';
import { postActions } from '../slice/postSlice';
import { db } from '../../../config/firebase';
import { FirebaseCollections } from '../../../utils/constants';

async function callApi(data: Post) {
  await addDoc(collection(db, FirebaseCollections.POSTS), data);
}

export default function* callAddPortfolioSaga({
  payload,
}: PayloadAction<Post>) {
  try {
    yield call(callApi, payload);
    yield put(postActions.addPostSuccess());
  } catch (error) {
    console.error('callAddPortfolioSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(postActions.addPostError('error'));
  }
}
