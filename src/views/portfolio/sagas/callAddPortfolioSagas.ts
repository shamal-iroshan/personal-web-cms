/* eslint-disable import/no-cycle */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { Portfolio } from '../types';
import errorToast from '../../../common/toast/errorToast';
import {
  ApiEndpointUrl,
  ApiRequestMethod,
  authorizedApiRequest,
} from '../../../utils/apiService';
import { portfolioActions } from '../slice/portfolioSlice';

async function callApi(data: Portfolio) {
  return authorizedApiRequest(
    ApiRequestMethod.POST,
    ApiEndpointUrl.ADD_PORTFOLIO,
    data,
  );
}

export default function* callAddPortfolioSaga({
  payload,
}: PayloadAction<Portfolio>) {
  try {
    yield call(callApi, payload);
    yield put(portfolioActions.addPortfolioSuccess());
  } catch (error) {
    console.error('callAddPortfolioSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(portfolioActions.addPortfolioError('error'));
  }
}
