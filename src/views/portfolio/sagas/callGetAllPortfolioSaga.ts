/* eslint-disable import/no-cycle */
import { call, put } from 'redux-saga/effects';
import { AllPortfolios } from '../types';
import errorToast from '../../../common/toast/errorToast';
import {
  ApiEndpointUrl,
  ApiRequestMethod,
  authorizedApiRequest,
} from '../../../utils/apiService';
import { portfolioActions } from '../slice/portfolioSlice';

async function callApi() {
  return authorizedApiRequest(
    ApiRequestMethod.GET,
    ApiEndpointUrl.GET_ALL_PORTFOLIOS,
  );
}

export default function* callGetAllPortfoliosSaga() {
  try {
    const portfolios: AllPortfolios = yield call(callApi);
    yield put(portfolioActions.getAllPortfolioSuccess(portfolios));
  } catch (error) {
    console.error('callGetAllPortfoliosSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(portfolioActions.getAllPortfolioError('error'));
  }
}
