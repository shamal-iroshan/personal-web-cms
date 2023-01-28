/* eslint-disable import/no-cycle */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { Config } from '../types';
import errorToast from '../../../common/toast/errorToast';
import { configActions } from '../slice/configSlice';
import {
  ApiEndpointUrl,
  ApiRequestMethod,
  authorizedApiRequest,
} from '../../../utils/apiService';

async function callApi(data: Config) {
  return authorizedApiRequest(
    ApiRequestMethod.POST,
    ApiEndpointUrl.ADD_CONFIG,
    data,
  );
}

export default function* callAddConfigSaga({ payload }: PayloadAction<Config>) {
  try {
    yield call(callApi, payload);
    yield put(configActions.addConfigSuccess());
  } catch (error) {
    console.error('callAddConfigSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(configActions.addConfigError('error'));
  }
}
