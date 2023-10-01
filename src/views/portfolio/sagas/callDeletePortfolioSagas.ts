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
import { portfolioActions } from '../slice/portfolioSlice';

async function callApi(portfolioId: string) {
  const url = decodePlaceHolder(ApiEndpointUrl.DELETE_PORTFOLIO, {
    portfolioId,
  });
  return authorizedApiRequest(ApiRequestMethod.DELETE, url);
}

export default function* callDeletePortfolioSaga({
  payload,
}: PayloadAction<string>) {
  try {
    yield call(callApi, payload);
    successToast('Success', 'You have successfully deleted.');
    yield put(portfolioActions.deletePortfolioSuccess());
  } catch (error) {
    console.error('callDeletePortfolioSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(portfolioActions.deletePortfolioError('error'));
  }
}
