/* eslint-disable import/no-cycle */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { addDoc, collection } from 'firebase/firestore';
import { Author } from '../types';
import errorToast from '../../../common/toast/errorToast';
import { postActions } from '../slice/postSlice';
import { db } from '../../../config/firebase';
import { FirebaseCollections } from '../../../utils/constants';

async function callApi(data: Author) {
  await addDoc(collection(db, FirebaseCollections.AUTHORS), data);
}

export default function* callAddAuthorSaga({ payload }: PayloadAction<Author>) {
  try {
    yield call(callApi, payload);
    yield put(postActions.addAuthorSuccess());
  } catch (error) {
    console.error('callAddAuthorSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(postActions.addAuthorError('error'));
  }
}
