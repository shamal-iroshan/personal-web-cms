/* eslint-disable import/no-cycle */
import { takeLatest } from 'redux-saga/effects';
import { messageActions } from '../slice/messageSlice';
import callGetAllMessagesSaga from './callGetAllMessagesSaga';
import callDeleteMessageSaga from './callDeleteMessageSaga';
import callUpdateMessageSaga from './callUpdateMessageSaga';

export default function* messageSagas() {
  yield takeLatest(messageActions.getAllMessages, callGetAllMessagesSaga);
  yield takeLatest(messageActions.deleteMessage, callDeleteMessageSaga);
  yield takeLatest(messageActions.deleteMessageSuccess, callGetAllMessagesSaga);
  yield takeLatest(messageActions.updateMessageSuccess, callGetAllMessagesSaga);
  yield takeLatest(messageActions.updateMessage, callUpdateMessageSaga);
}
