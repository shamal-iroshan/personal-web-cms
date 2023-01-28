import { call, put } from 'redux-saga/effects';
import { Config } from '../types';
import errorToast from '../../../common/toast/errorToast';
// eslint-disable-next-line import/no-cycle
import { configActions } from '../slice/configSlice';
import {
  ApiEndpointUrl,
  ApiRequestMethod,
  authorizedApiRequest,
} from '../../../utils/apiService';

async function callApi() {
  return authorizedApiRequest(ApiRequestMethod.GET, ApiEndpointUrl.GET_CONFIG);
}

export default function* callGetConfigSaga() {
  try {
    const configs: Config = yield call(callApi);
    yield put(configActions.getConfigSuccess(configs));
  } catch (error) {
    console.error('callGetConfigSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(configActions.getConfigError('error'));
  }
}
