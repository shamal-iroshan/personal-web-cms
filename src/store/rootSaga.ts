/* eslint-disable import/no-cycle */
import { spawn } from 'redux-saga/effects';
import signInSagas from '../views/signIn/sagas/signInSagas';
import configSagas from '../views/config/sagas/configSagas';
import messageSagas from '../views/message/sagas/messageSagas';
import portfolioSagas from '../views/portfolio/sagas/portfolioSagas';
import postSagas from '../views/post/sagas/postSagas';

export default function* rootSaga() {
  yield spawn(signInSagas);
  yield spawn(configSagas);
  yield spawn(messageSagas);
  yield spawn(portfolioSagas);
  yield spawn(postSagas);
}
