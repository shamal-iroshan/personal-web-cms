/* eslint-disable import/no-cycle */
import { takeLatest } from 'redux-saga/effects';
import { messageActions } from '../slice/messageSlice';
import callGetAllMessagesSaga from './callGetAllMessagesSaga';
import callDeleteMessageSaga from './callDeleteMessageSaga';

export default function* messageSagas() {
  yield takeLatest(messageActions.getAllMessages, callGetAllMessagesSaga);
  yield takeLatest(messageActions.deleteMessage, callDeleteMessageSaga);
  yield takeLatest(messageActions.deleteMessageSuccess, callGetAllMessagesSaga);
}
