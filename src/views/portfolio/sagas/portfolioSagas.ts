/* eslint-disable import/no-cycle */
import { takeLatest } from 'redux-saga/effects';
import { portfolioActions } from '../slice/portfolioSlice';
import callAddPortfolioSaga from './callAddPortfolioSagas';
import callGetPortfolioSaga from './callGetPorrtfolioSaga';
import callUpdatePortfolioSaga from './callUpdatePortfolioSaga';
import callDeletePortfolioSaga from './callDeletePortfolioSagas';
import callGetAllPortfoliosSaga from './callGetAllPortfolioSaga';

export default function* portfolioSagas() {
  yield takeLatest(portfolioActions.addPortfolio, callAddPortfolioSaga);
  yield takeLatest(portfolioActions.getPortfolio, callGetPortfolioSaga);
  yield takeLatest(portfolioActions.updatePortfolio, callUpdatePortfolioSaga);
  yield takeLatest(portfolioActions.deletePortfolio, callDeletePortfolioSaga);
  yield takeLatest(portfolioActions.getAllPortfolios, callGetAllPortfoliosSaga);
  yield takeLatest(
    portfolioActions.deletePortfolioSuccess,
    callGetAllPortfoliosSaga,
  );
}
