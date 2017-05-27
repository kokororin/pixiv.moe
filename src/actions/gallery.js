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
  'SET_CONTENT_SCROLLTOP',
  'CLEAR_SOURCE'
]);

function setItems(data) {
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

export function setContentScrollTop(scrollTop) {
  return {
    type: types.SET_CONTENT_SCROLLTOP,
    payload: {
      contentScrollTop: scrollTop
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
