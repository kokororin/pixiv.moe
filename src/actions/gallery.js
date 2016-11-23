import config from 'config';

import { cachedFetch } from '../utils';

export const SET_ITEMS = 'SET_ITEMS';
export const SET_IMAGES = 'SET_IMAGES';
export const SET_PAGE = 'SET_PAGE';
export const SET_FETCH_ERROR = 'SET_FETCH_ERROR';
export const SET_FETCH_STATUS = 'SET_FETCH_STATUS';
export const SET_TAG = 'SET_TAG';
export const SET_CONTENT_SCROLLTOP = 'SET_CONTENT_SCROLLTOP';
export const CLEAR_SOURCE = 'CLEAR_SOURCE';

function setItems(data) {
  return {
    type: SET_ITEMS,
    payload: {
      data: data
    }
  };
}

function setImages(data) {
  return {
    type: SET_IMAGES,
    payload: {
      data: data
    }
  };
}

export function setPage(page) {
  return {
    type: SET_PAGE,
    payload: {
      page: page
    }
  };
}

function setFetchError(isError) {
  return {
    type: SET_FETCH_ERROR,
    payload: {
      isError: isError
    }
  };
}

function setFetchStatus(isFetching) {
  return {
    type: SET_FETCH_STATUS,
    payload: {
      isFetching: isFetching
    }
  };
}

function fetchSource() {
  return (dispatch, getState) => {
    dispatch(setFetchError(false));
    dispatch(setFetchStatus(true));
    return cachedFetch(`${config.apiBaseURL}${config.galleryURI}/${getState().gallery.tag}/${getState().gallery.page}`, {
      mode: 'cors',
      timeout: 10e3,
      expiryKey: 'expires_at'
    })
      .then((data) => {
        if (data.status === 'success' && data.count > 0) {
          Object.keys(data.response).map((key) => {
            const elem = data.response[key];
            dispatch(setItems(elem));
            dispatch(setImages({
              uri: elem.image_urls.px_480mw,
              title: elem.title,
              link: `/#/${elem.id}`,
              id: elem.id
            }));
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
    type: SET_TAG,
    payload: {
      tag: tag
    }
  };
}

export function setContentScrollTop(scrollTop) {
  return {
    type: SET_CONTENT_SCROLLTOP,
    payload: {
      contentScrollTop: scrollTop
    }
  };
}

export function clearSource() {
  return {
    type: CLEAR_SOURCE,
    payload: {
      items: [],
      images: []
    }
  };
}
