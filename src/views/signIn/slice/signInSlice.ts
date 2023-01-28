import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignInPayload, SignInState } from '../types';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../../store/types';

const initialState: SignInState = {
  user: {},
  signInIsLoading: false,
  signInIsSuccess: false,
  signInError: { hasError: false, description: '' },
  signOutIsLoading: false,
  idToken: '',
};

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signIn(state, action: PayloadAction<SignInPayload>) {
      state.signInIsLoading = true;
      state.signInError = { hasError: false, description: '' };
    },
    signInSuccess(state, action: PayloadAction<object>) {
      state.signInIsLoading = false;
      // state.signInIsSuccess = true;
      state.user = action.payload;
    },
    signInError(state, action: PayloadAction<string>) {
      state.signInIsLoading = false;
      state.signInError = { hasError: true, description: action.payload };
    },
    signOut(state) {
      state.signOutIsLoading = true;
    },
    signOutSuccess(state) {
      state.signOutIsLoading = false;
      state.signInIsSuccess = false;
    },
    setIdToken(state, action: PayloadAction<string>) {
      state.idToken = action.payload;
    },
  },
});

// Actions
export const signInActions = signInSlice.actions;

// Selectors
export const selectSignInIsLoading = (state: RootState) =>
  state.signInReducer.signInIsLoading;
export const selectSignInIsSuccess = (state: RootState) =>
  state.signInReducer.signInIsSuccess;
export const selectSignInError = (state: RootState) =>
  state.signInReducer.signInError;
export const selectSignOutIsLoading = (state: RootState) =>
  state.signInReducer.signOutIsLoading;
export const selectIdToken = (state: RootState) => state.signInReducer.idToken;

// Reducer
const signInReducer = signInSlice.reducer;
export default signInReducer;
