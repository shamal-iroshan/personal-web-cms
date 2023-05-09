/* eslint-disable import/no-cycle */
import { takeLatest } from 'redux-saga/effects';
import { configActions } from '../slice/configSlice';
import callAddConfigSaga from './callAddConfigSaga';
import callDeleteConfigSaga from './callDeleteConfigSaga';
import callGetAllConfigsSaga from './callGetAllConfigsSaga';
import callGetConfigSaga from './callGetConfigSaga';
import callUpdateConfigSaga from './callUpdateConfigSaga';
import callSetActiveConfigSaga from './callSetActiveConfigSaga';

export default function* configSagas() {
  yield takeLatest(configActions.addConfig, callAddConfigSaga);
  yield takeLatest(configActions.deleteConfig, callDeleteConfigSaga);
  yield takeLatest(configActions.getAllConfigs, callGetAllConfigsSaga);
  yield takeLatest(configActions.getConfig, callGetConfigSaga);
  yield takeLatest(configActions.updateConfig, callUpdateConfigSaga);
  yield takeLatest(configActions.setConfigAsActive, callSetActiveConfigSaga);
}
