/* eslint-disable import/no-cycle */
import { call, put } from 'redux-saga/effects';
import { collection, getDocs } from 'firebase/firestore';
import errorToast from '../../../common/toast/errorToast';
import { postActions } from '../slice/postSlice';
import { db } from '../../../config/firebase';
import { FirebaseCollections } from '../../../utils/constants';
import { Category } from '../types';

async function callApi() {
  const querySnapShot = await getDocs(
    collection(db, FirebaseCollections.CATEGORIES),
  );

  const data = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export default function* callGetAllCategoriesSaga() {
  try {
    const categories: Category[] = yield call(callApi);
    yield put(postActions.getAllCategoriesSuccess(categories));
  } catch (error) {
    console.error('callGetAllCategoriesSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(postActions.getAllCategoriesError('error'));
  }
}
