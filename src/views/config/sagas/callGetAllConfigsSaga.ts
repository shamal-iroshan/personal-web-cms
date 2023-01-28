import { call, put } from 'redux-saga/effects';
import { AllConfigs } from '../types';
import errorToast from '../../../common/toast/errorToast';
// eslint-disable-next-line import/no-cycle
import { configActions } from '../slice/configSlice';
import {
  ApiEndpointUrl,
  ApiRequestMethod,
  authorizedApiRequest,
} from '../../../utils/apiService';

async function callApi() {
  return authorizedApiRequest(
    ApiRequestMethod.GET,
    ApiEndpointUrl.GET_ALL_CONFIGS,
  );
}

export default function* callGetAllConfigsSaga() {
  try {
    const configs: AllConfigs = yield call(callApi);
    yield put(configActions.getAllConfigSuccess(configs));
  } catch (error) {
    console.error('callGetAllConfigsSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(configActions.getAllConfigError('error'));
  }
}
