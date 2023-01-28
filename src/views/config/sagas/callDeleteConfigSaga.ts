import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import errorToast from '../../../common/toast/errorToast';
// eslint-disable-next-line import/no-cycle
import { configActions } from '../slice/configSlice';
import {
  ApiEndpointUrl,
  ApiRequestMethod,
  authorizedApiRequest,
  decodePlaceHolder,
} from '../../../utils/apiService';
import successToast from '../../../common/toast/successToast';

async function callApi(configId: string) {
  const url = decodePlaceHolder(ApiEndpointUrl.DELETE_CONFIG, { configId });
  return authorizedApiRequest(ApiRequestMethod.DELETE, url);
}

export default function* callDeleteConfigSaga({
  payload,
}: PayloadAction<string>) {
  try {
    yield call(callApi, payload);
    successToast('Success', 'You have successfully deleted.');
    yield put(configActions.deleteConfigSuccess());
  } catch (error) {
    console.error('callDeleteConfigSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(configActions.deleteConfigError('error'));
  }
}
