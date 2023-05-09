/* eslint-disable import/no-cycle */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import errorToast from '../../../common/toast/errorToast';
import { messageActions } from '../slice/messageSlice';
import {
  ApiEndpointUrl,
  ApiRequestMethod,
  authorizedApiRequest,
  decodePlaceHolder,
} from '../../../utils/apiService';
import successToast from '../../../common/toast/successToast';

async function callApi(messageId: string) {
  const url = decodePlaceHolder(ApiEndpointUrl.DELETE_MESSAGE, { messageId });
  return authorizedApiRequest(ApiRequestMethod.DELETE, url);
}

export default function* callDeleteMessageSaga({
  payload,
}: PayloadAction<string>) {
  try {
    // eslint-disable-next-line no-console
    console.log(payload);
    yield call(callApi, payload);
    successToast('Success', 'You have successfully deleted.');
    yield put(messageActions.deleteMessageSuccess());
  } catch (error) {
    console.error('callDeleteMessageSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(messageActions.deleteMessageError('error'));
  }
}
