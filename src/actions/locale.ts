import namespacedTypes from 'namespaced-types';

export interface ILocaleActionValues {
  SET_LOCALE: string;
}

export const types = namespacedTypes('locale', [
  'SET_LOCALE'
]) as ILocaleActionValues;

export interface ILocaleAction {
  type: string;
  payload: any;
}

export function setLocale(data: any) {
  return {
    type: types.SET_LOCALE,
    payload: data
  };
}
