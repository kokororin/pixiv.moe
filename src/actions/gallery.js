import namespacedTypes from 'namespaced-types';

import config from '@/config';
import { cachedFetch } from '@/utils';

export const types = namespacedTypes('gallery', [
  'SET_ITEMS',
  'SET_IMAGES',
  'SET_PAGE',
  'SET_FETCH_ERROR',
  'SET_FETCH_STATUS',
  'SET_TAG',
  'CLEAR_SOURCE',
  'SET_ERROR_TIMES',
  'CLEAR_ERROR_TIMES'
]);

export function setItems(data) {
  return {
    type: types.SET_ITEMS,
    payload: {
      data
    }
  };
}

export function setPage(page) {
  return {
    type: types.SET_PAGE,
    payload: {
      page
    }
  };
}

function setFetchError(isError) {
  return {
    type: types.SET_FETCH_ERROR,
    payload: {
      isError
    }
  };
}

function setFetchStatus(isFetching) {
  return {
    type: types.SET_FETCH_STATUS,
    payload: {
      isFetching
    }
  };
}

function setErrorTimes() {
  return {
    type: types.SET_ERROR_TIMES
  };
}

export function clearErrorTimes() {
  return {
    type: types.CLEAR_ERROR_TIMES
  };
}

function fetchSource() {
  return (dispatch, getState) => {
    dispatch(setFetchError(false));
    dispatch(setFetchStatus(true));
    if (getState().gallery.tag === 'ranking') {
      return cachedFetch(`${config.apiBaseURL}${config.rankingURI}`, {
        mode: 'cors',
        timeout: 10e3,
        data: {
          page: getState().gallery.page
        }
      })
        .then(data => {
          if (data.status === 'success' && data.count > 0) {
            Object.keys(data.response.works).map(key => {
              const elem = data.response.works[key];
              dispatch(setItems(elem));
            });
          } else {
            dispatch(setFetchError(true));
            dispatch(setErrorTimes());
          }
        })
        .then(() => {
          dispatch(setFetchStatus(false));
          dispatch(setPage(getState().gallery.page + 1));
        })
        .catch(() => {
          dispatch(setFetchStatus(false));
          dispatch(setFetchError(true));
        });
    }
    return cachedFetch(`${config.apiBaseURL}${config.galleryURI}`, {
      mode: 'cors',
      timeout: 10e3,
      expiryKey: 'expires_at',
      data: {
        tag: getState().gallery.tag,
        page: getState().gallery.page
      }
    })
      .then(data => {
        if (data.status === 'success' && data.count > 0) {
          Object.keys(data.response).map(key => {
            const elem = data.response[key];
            dispatch(setItems(elem));
          });
        } else {
          dispatch(setFetchError(true));
          dispatch(setErrorTimes());
        }
      })
      .then(() => {
        dispatch(setFetchStatus(false));
        dispatch(setPage(getState().gallery.page + 1));
      })
      .catch(() => {
        dispatch(setFetchStatus(false));
        dispatch(setFetchError(true));
      });
  };
}

export function fetchSourceIfNeeded() {
  return (dispatch, getState) => {
    if (!getState().gallery.isFetching) {
      return dispatch(fetchSource());
    }
  };
}

export function setTag(tag) {
  return {
    type: types.SET_TAG,
    payload: {
      tag
    }
  };
}

export function clearSource() {
  return {
    type: types.CLEAR_SOURCE,
    payload: {
      items: [],
      images: []
    }
  };
}
