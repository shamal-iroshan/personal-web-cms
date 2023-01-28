import { call, put } from 'redux-saga/effects';
import { signOut } from 'firebase/auth';
// eslint-disable-next-line import/no-cycle
import { signInActions } from '../slice/signInSlice';
import errorToast from '../../../common/toast/errorToast';
import { auth } from '../../../config/firebase';

async function callApi() {
  return signOut(auth);
}

export default function* callSignOutSaga() {
  try {
    yield call(callApi);
    yield put(signInActions.signOutSuccess());
  } catch (error) {
    console.error('callSignOutSaga', error);
    errorToast('Oops!', 'Something went wrong please try again later.');
  }
}
