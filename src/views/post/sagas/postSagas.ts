/* eslint-disable import/no-cycle */
import { takeLatest } from 'redux-saga/effects';
import { postActions } from '../slice/postSlice';
import callAddPostSaga from './callAddPostSaga';
import callGetAllPostsSaga from './callGetAllPostsSaga';
import callDeletePostSaga from './callDeletePostSaga';
import callGetPostSaga from './callGetPostSaga';
import callUpdatePostSaga from './callUpdatePostSaga';

export default function* postSagas() {
  yield takeLatest(postActions.addPost, callAddPostSaga);
  yield takeLatest(postActions.getAllPosts, callGetAllPostsSaga);
  yield takeLatest(postActions.deletePost, callDeletePostSaga);
  yield takeLatest(postActions.deletePostSuccess, callGetAllPostsSaga);
  yield takeLatest(postActions.getPost, callGetPostSaga);
  yield takeLatest(postActions.updatePost, callUpdatePostSaga);
}
