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
import { Config } from '../types';

async function callApi(data: Config) {
  const url = decodePlaceHolder(ApiEndpointUrl.UPDATE_CONFIG, {
    configId: data.id,
  });
  return authorizedApiRequest(ApiRequestMethod.DELETE, url, data);
}

export default function* callUpdateConfigSaga({
  payload,
}: PayloadAction<Config>) {
  try {
    yield call(callApi, payload);
    successToast('Success', 'You have successfully updated.');
    yield put(configActions.updateConfigSuccess());
  } catch (error) {
    console.error('callUpdateConfigSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(configActions.updateConfigError('error'));
  }
}
