/* eslint-disable import/no-cycle */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { doc, updateDoc } from 'firebase/firestore';
import errorToast from '../../../common/toast/errorToast';
import successToast from '../../../common/toast/successToast';
import { Post } from '../types';
import { postActions } from '../slice/postSlice';
import { db } from '../../../config/firebase';
import { FirebaseCollections } from '../../../utils/constants';

async function callApi(data: Post) {
  if (data.id) {
    await updateDoc(doc(db, FirebaseCollections.POSTS, data.id), {
      title: data.title,
      description: data.description,
      content: data.content,
    });
  }
}

export default function* callUpdatePostSaga({ payload }: PayloadAction<Post>) {
  try {
    yield call(callApi, payload);
    successToast('Success', 'You have successfully updated.');
    yield put(postActions.updatePostSuccess());
    yield put(postActions.getPost(payload.id || ''));
  } catch (error) {
    console.error('callUpdatePostSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(postActions.updatePostError('error'));
  }
}
