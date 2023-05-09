/* eslint-disable import/no-cycle */
import { spawn } from 'redux-saga/effects';
import signInSagas from '../views/signIn/sagas/signInSagas';
import configSagas from '../views/config/sagas/configSagas';
import messageSagas from '../views/message/sagas/messageSagas';

export default function* rootSaga() {
  yield spawn(signInSagas);
  yield spawn(configSagas);
  yield spawn(messageSagas);
}
