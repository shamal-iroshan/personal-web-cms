/* eslint-disable import/no-cycle */
import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { Portfolio } from '../types';
import errorToast from '../../../common/toast/errorToast';
import {
  ApiEndpointUrl,
  ApiRequestMethod,
  authorizedApiRequest,
  decodePlaceHolder,
} from '../../../utils/apiService';
import { portfolioActions } from '../slice/portfolioSlice';

async function callApi(portfolioId: string) {
  const url = decodePlaceHolder(ApiEndpointUrl.GET_PORTFOLIO, { portfolioId });
  return authorizedApiRequest(ApiRequestMethod.GET, url);
}

export default function* callGetPortfolioSaga({
  payload,
}: PayloadAction<string>) {
  try {
    const portfolio: Portfolio = yield call(callApi, payload);
    yield put(portfolioActions.getPortfolioSuccess(portfolio));
  } catch (error) {
    console.error('callGetPortfolioSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(portfolioActions.getPortfolioError('error'));
  }
}
