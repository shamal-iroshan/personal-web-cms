/* eslint-disable import/no-cycle */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import errorToast from '../../../common/toast/errorToast';
import {
  ApiEndpointUrl,
  ApiRequestMethod,
  authorizedApiRequest,
  decodePlaceHolder,
} from '../../../utils/apiService';
import successToast from '../../../common/toast/successToast';
import { Portfolio } from '../types';
import { portfolioActions } from '../slice/portfolioSlice';

async function callApi(data: Portfolio) {
  const url = decodePlaceHolder(ApiEndpointUrl.UPDATE_PORTFOLIO, {
    portfolioId: data.id,
  });
  return authorizedApiRequest(ApiRequestMethod.PATCH, url, data);
}

export default function* callUpdatePortfolioSaga({
  payload,
}: PayloadAction<Portfolio>) {
  try {
    yield call(callApi, payload);
    successToast('Success', 'You have successfully updated.');
    yield put(portfolioActions.updatePortfolioSuccess());
    yield put(portfolioActions.getPortfolio(payload.id || ''));
  } catch (error) {
    console.error('callUpdatePortfolioSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(portfolioActions.updatePortfolioError('error'));
  }
}
