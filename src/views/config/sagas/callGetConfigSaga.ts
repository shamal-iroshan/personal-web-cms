/* eslint-disable import/no-cycle */
import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { Config } from '../types';
import errorToast from '../../../common/toast/errorToast';
import { configActions } from '../slice/configSlice';
import {
  ApiEndpointUrl,
  ApiRequestMethod,
  authorizedApiRequest,
  decodePlaceHolder,
} from '../../../utils/apiService';

async function callApi(configId: string) {
  const url = decodePlaceHolder(ApiEndpointUrl.GET_CONFIG, { configId });
  return authorizedApiRequest(ApiRequestMethod.GET, url);
}

export default function* callGetConfigSaga({ payload }: PayloadAction<string>) {
  try {
    const configs: Config = yield call(callApi, payload);
    yield put(configActions.getConfigSuccess(configs));
  } catch (error) {
    console.error('callGetConfigSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(configActions.getConfigError('error'));
  }
}
