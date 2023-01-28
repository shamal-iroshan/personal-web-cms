export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInState {
  user: object;
  signInIsLoading: boolean;
  signInIsSuccess: boolean;
  signInError: { hasError: boolean; description: string };
  signOutIsLoading: boolean;
  idToken: string;
}
