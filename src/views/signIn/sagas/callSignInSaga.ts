import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SignInPayload } from '../types';
// eslint-disable-next-line import/no-cycle
import { signInActions } from '../slice/signInSlice';
import errorToast from '../../../common/toast/errorToast';
import { auth } from '../../../config/firebase';

const signInAsync = async (data: SignInPayload) => {
  return signInWithEmailAndPassword(auth, data.email, data.password).then(
    (res) => res,
  );
};

export default function* callSignInSaga({
  payload,
}: PayloadAction<SignInPayload>) {
  try {
    const response: object = yield call(signInAsync, payload);
    // @ts-ignore
    yield put(signInActions.signInSuccess(response?.user));
  } catch (error) {
    console.error('callSignInSaga', error);
    errorToast('Oops!', 'Something went wrong please try again later.');
    yield put(signInActions.signInError('error'));
  }
}
