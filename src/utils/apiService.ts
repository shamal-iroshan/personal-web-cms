import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import store from '../store/store';

export enum ApiRequestMethod {
  POST = 'post',
  GET = 'get',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}

export enum ApiEndpointUrl {
  SIGN_IN = 'user/sign-in',
  SIGN_OUT = 'user/sign-out',
  GET_ALL_CONFIGS = 'config',
  GET_CONFIG = 'config/{configId}',
  ADD_CONFIG = 'config',
  UPDATE_CONFIG = 'config/{configId}',
  DELETE_CONFIG = 'config/{configId}',
  SET_ACTIVE_CONFIG = 'config/active/{configId}',
  GET_ALL_PORTFOLIOS = 'portfolio',
  GET_PORTFOLIO = 'portfolio/{portfolioId}',
  ADD_PORTFOLIO = 'portfolio',
  UPDATE_PORTFOLIO = 'portfolio/{portfolioId}',
  DELETE_PORTFOLIO = 'portfolio/{portfolioId}',
  GET_ALL_MESSAGES = 'message',
  GET_MESSAGES_BY_STATUS = 'message/filter/status',
  GET_MESSAGE = 'message/{messageId}',
  DELETE_MESSAGE = 'message/{messageId}',
  UPDATE_MESSAGE = 'message/{messageId}',
}

export function decodePlaceHolder(input: string, placeholders: object): string {
  let inputString = input;
  Object.keys(placeholders).forEach((key: string) => {
    const reg = new RegExp(`{${key}}`, 'g');
    // @ts-ignore
    inputString = inputString.replace(reg, placeholders[key]);
  });

  return inputString;
}

export function appendQueryParameters(
  input: string,
  queryParams: Record<string, string | number | null | undefined>,
): string {
  const queryParamsWithoutNullAndUndefined = Object.entries(queryParams).reduce(
    // @ts-ignore
    // eslint-disable-next-line no-return-assign,no-param-reassign
    (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {},
  );
  // @ts-ignore
  const result = `?${new URLSearchParams(
    queryParamsWithoutNullAndUndefined,
  ).toString()}`;
  return input + result;
}

export async function apiRequest(
  method: ApiRequestMethod,
  url: ApiEndpointUrl | string,
  data?: object,
) {
  return axios({
    method,
    url: `${process.env.REACT_APP_BASE_API_URL}${url}`,
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function authorizedApiRequest(
  method: ApiRequestMethod,
  url: ApiEndpointUrl | string,
  data?: object,
) {
  const accessToken = store.getState().signInReducer.idToken;
  return axios({
    method,
    url: `${process.env.REACT_APP_BASE_API_URL}${url}`,
    data,
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
