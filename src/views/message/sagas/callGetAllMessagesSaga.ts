/* eslint-disable import/no-cycle */
import { call, put } from 'redux-saga/effects';
import { AllMessages } from '../types';
import errorToast from '../../../common/toast/errorToast';
import { messageActions } from '../slice/messageSlice';
import {
  ApiEndpointUrl,
  ApiRequestMethod,
  authorizedApiRequest,
} from '../../../utils/apiService';

async function callApi() {
  return authorizedApiRequest(
    ApiRequestMethod.GET,
    ApiEndpointUrl.GET_ALL_MESSAGES,
  );
}

export default function* callGetAllMessagesSaga() {
  try {
    const messages: AllMessages = yield call(callApi);
    yield put(messageActions.getAllMessageSuccess(messages));
  } catch (error) {
    console.error('callGetAllMessagesSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(messageActions.getAllMessageError('error'));
  }
}
