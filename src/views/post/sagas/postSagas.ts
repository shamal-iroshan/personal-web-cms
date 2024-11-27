/* eslint-disable import/no-cycle */
import { takeLatest } from 'redux-saga/effects';
import { postActions } from '../slice/postSlice';
import callAddPostSaga from './callAddPostSaga';

export default function* postSagas() {
  yield takeLatest(postActions.addPost, callAddPostSaga);
}
