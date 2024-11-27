/* eslint-disable import/no-cycle */
import { takeLatest } from 'redux-saga/effects';
import { postActions } from '../slice/postSlice';
import callAddPostSaga from './callAddPostSaga';
import callGetAllPostsSaga from './callGetAllPostsSaga';

export default function* postSagas() {
  yield takeLatest(postActions.addPost, callAddPostSaga);
  yield takeLatest(postActions.getAllPosts, callGetAllPostsSaga);
}
