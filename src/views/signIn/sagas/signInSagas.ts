import { takeLatest } from 'redux-saga/effects';
// eslint-disable-next-line import/no-cycle
import { signInActions } from '../slice/signInSlice';
// eslint-disable-next-line import/no-cycle
import callSignInSaga from './callSignInSaga';
// eslint-disable-next-line import/no-cycle
import callSignOutSaga from './callSignOutSaga';

export default function* signInSagas() {
  yield takeLatest(signInActions.signIn, callSignInSaga);
  yield takeLatest(signInActions.signOut, callSignOutSaga);
}
