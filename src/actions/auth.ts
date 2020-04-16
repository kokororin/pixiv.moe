import namespacedTypes from 'namespaced-types';

export interface IAuthActionValues {
  SET_AUTH: string;
}

export const types = namespacedTypes('auth', ['SET_AUTH']) as IAuthActionValues;

export interface IAuthAction {
  type: string;
  payload: any;
}

export function setAuth(data: any) {
  return {
    type: types.SET_AUTH,
    payload: data
  };
}
