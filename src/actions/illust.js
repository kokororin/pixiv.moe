import config from 'config';

import { cachedFetch } from '../utils';

export const SET_ITEM = 'SET_ITEM';
export const SET_FETCH_ERROR = 'SET_FETCH_ERROR';
export const SET_FETCH_STATUS = 'SET_FETCH_STATUS';
export const CLEAR_ITEM = 'CLEAR_ITEM';

function setItem(data) {
  return {
    type: SET_ITEM,
    payload: {
      data: data
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

export function setFetchStatus(isFetchCompleted) {
  return {
    type: SET_FETCH_STATUS,
    payload: {
      isFetchCompleted: isFetchCompleted
    }
  };
}

export function fetchItem(illustId) {
  return (dispatch) => {
    dispatch(setFetchError(false));
    return cachedFetch(config.sourceURL, {
      mode: 'cors',
      timeout: 10e3,
      query: {
        type: 'illust',
        illust_id: illustId
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('response is not OK');
      })
      .then((data) => {
        if (data.status === 'success') {
          dispatch(setItem(data.response));
        } else {
          dispatch(setFetchError(true));
        }
      })
      .then(() => {
        dispatch(setFetchStatus(true));
      })
      .catch(() => {
        dispatch(setFetchStatus(true));
        dispatch(setFetchError(true));
      });
  };
}

export function clearItem() {
  return {
    type: CLEAR_ITEM,
    payload: {
      item: {
        title: ''
      }
    }
  };
}
