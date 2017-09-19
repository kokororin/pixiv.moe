import namespacedTypes from 'namespaced-types';

import config from '@/config';
import { cachedFetch } from '@/utils';

export const types = namespacedTypes('illust', [
  'SET_ITEM',
  'SET_FETCH_ERROR',
  'SET_FETCH_STATUS',
  'SET_COMMENTS',
  'SET_COMMENTS_PAGE',
  'SET_COMMENTS_END',
  'SET_FETCH_COMMENTS_ERROR',
  'SET_FETCH_COMMENTS_STATUS',
  'CLEAR_COMMENTS'
]);

function setItem(data) {
  return {
    type: types.SET_ITEM,
    payload: {
      data
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

export function setFetchStatus(isFetching) {
  return {
    type: types.SET_FETCH_STATUS,
    payload: {
      isFetching
    }
  };
}

export function fetchItem(illustId) {
  return dispatch => {
    dispatch(setFetchStatus(true));
    dispatch(setFetchError(false));
    return cachedFetch(`${config.apiBaseURL}${config.illustURI}/${illustId}`, {
      mode: 'cors',
      timeout: 10e3
    })
      .then(data => {
        if (data.status === 'success') {
          dispatch(setItem(data.response));
        } else {
          dispatch(setFetchError(true));
        }
      })
      .then(() => {
        dispatch(setFetchStatus(false));
      })
      .catch(() => {
        dispatch(setFetchStatus(false));
        dispatch(setFetchError(true));
      });
  };
}

function setComments(data) {
  return {
    type: types.SET_COMMENTS,
    payload: {
      data
    }
  };
}

function setCommentsPage(page) {
  return {
    type: types.SET_COMMENTS_PAGE,
    payload: {
      page
    }
  };
}

function setCommentsEnd(isCommentsEnd) {
  return {
    type: types.SET_COMMENTS_END,
    payload: {
      isCommentsEnd
    }
  };
}

function setFetchCommentsError(isError) {
  return {
    type: types.SET_FETCH_COMMENTS_ERROR,
    payload: {
      isError
    }
  };
}

function setFetchCommentsStatus(isFetching) {
  return {
    type: types.SET_FETCH_COMMENTS_STATUS,
    payload: {
      isFetching
    }
  };
}

export function fetchComments(illustId) {
  return (dispatch, getState) => {
    dispatch(setFetchCommentsStatus(true));
    dispatch(setFetchCommentsError(false));
    return cachedFetch(
      `${config.apiBaseURL}${config.commentsURI}/${illustId}`,
      {
        mode: 'cors',
        timeout: 10e3,
        data: {
          page: getState().illust.page
        }
      }
    )
      .then(data => {
        if (data.next) {
          dispatch(setCommentsPage(getState().illust.page + 1));
        } else {
          dispatch(setCommentsEnd(true));
        }
        dispatch(setComments(data.comments));
      })
      .then(() => {
        dispatch(setFetchCommentsStatus(false));
      })
      .catch(() => {
        dispatch(setFetchCommentsStatus(false));
        dispatch(setFetchCommentsError(true));
      });
  };
}

export function clearComments() {
  return {
    type: types.CLEAR_COMMENTS,
    payload: {
      comments: [],
      page: 1,
      isCommentsEnd: false
    }
  };
}
