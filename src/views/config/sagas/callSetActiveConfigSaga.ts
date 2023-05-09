/* eslint-disable import/no-cycle */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import errorToast from '../../../common/toast/errorToast';
import { configActions } from '../slice/configSlice';
import {
  ApiEndpointUrl,
  ApiRequestMethod,
  authorizedApiRequest,
  decodePlaceHolder,
} from '../../../utils/apiService';
import successToast from '../../../common/toast/successToast';

async function callApi(configId: string) {
  const url = decodePlaceHolder(ApiEndpointUrl.SET_ACTIVE_CONFIG, {
    configId,
  });
  return authorizedApiRequest(ApiRequestMethod.PATCH, url);
}

export default function* callSetActiveConfigSaga({
  payload,
}: PayloadAction<string>) {
  try {
    yield call(callApi, payload);
    successToast('Success', 'Active config changed.');
    yield put(configActions.setConfigAsActiveSuccess());
  } catch (error) {
    console.error('callSetActiveConfigSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(configActions.setConfigAsActiveError('error'));
  }
}
