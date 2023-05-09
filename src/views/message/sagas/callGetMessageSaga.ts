/* eslint-disable import/no-cycle */
import { call, put } from 'redux-saga/effects';
import { Message } from '../types';
import errorToast from '../../../common/toast/errorToast';
import { messageActions } from '../slice/messageSlice';
import {
  ApiEndpointUrl,
  ApiRequestMethod,
  authorizedApiRequest,
} from '../../../utils/apiService';

async function callApi() {
  return authorizedApiRequest(ApiRequestMethod.GET, ApiEndpointUrl.GET_MESSAGE);
}

export default function* callGetMessageSaga() {
  try {
    const message: Message = yield call(callApi);
    yield put(messageActions.getMessageSuccess(message));
  } catch (error) {
    console.error('callGetMessageSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(messageActions.getMessageError('error'));
  }
}
