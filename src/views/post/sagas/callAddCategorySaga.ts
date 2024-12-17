/* eslint-disable import/no-cycle */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { addDoc, collection } from 'firebase/firestore';
import errorToast from '../../../common/toast/errorToast';
import { postActions } from '../slice/postSlice';
import { db } from '../../../config/firebase';
import { FirebaseCollections } from '../../../utils/constants';
import { Category } from '../types';

async function callApi(data: Category) {
  await addDoc(collection(db, FirebaseCollections.CATEGORIES), data);
}

export default function* callAddCategorySaga({
  payload,
}: PayloadAction<Category>) {
  try {
    yield call(callApi, payload);
    yield put(postActions.addCategorySuccess());
  } catch (error) {
    console.error('callAddCategorySaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(postActions.addCategoryError('error'));
  }
}
