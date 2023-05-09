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
import { Message } from '../types';

async function callApi(data: Message) {
  const url = decodePlaceHolder(ApiEndpointUrl.UPDATE_MESSAGE, {
    configId: data.id,
  });
  return authorizedApiRequest(ApiRequestMethod.PATCH, url, data);
}

export default function* callUpdateMessageSaga({
  payload,
}: PayloadAction<Message>) {
  try {
    yield call(callApi, payload);
    successToast('Success', 'You have successfully updated.');
    yield put(messageActions.updateMessageSuccess());
  } catch (error) {
    console.error('callUpdateMessageSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(messageActions.updateMessageError('error'));
  }
}
