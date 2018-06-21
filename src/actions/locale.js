import namespacedTypes from 'namespaced-types';

export const types = namespacedTypes('locale', ['SET_LOCALE']);

export function setLocale(data) {
  return {
    type: types.SET_LOCALE,
    payload: data
  };
}
