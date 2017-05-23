import config from '@/config';

import { cachedFetch } from '@/utils';

export const SET_ITEM = 'SET_ITEM';
export const SET_FETCH_ERROR = 'SET_FETCH_ERROR';
export const SET_FETCH_STATUS = 'SET_FETCH_STATUS';
export const CLEAR_ITEM = 'CLEAR_ITEM';
export const SET_COMMENTS = 'SET_COMMENTS';
export const SET_COMMENTS_PAGE = 'SET_COMMENTS_PAGE';
export const SET_COMMENTS_END = 'SET_COMMENTS_END';
export const SET_FETCH_COMMENTS_ERROR = 'SET_FETCH_COMMENTS_ERROR';
export const SET_FETCH_COMMENTS_STATUS = 'SET_FETCH_COMMENTS_STATUS';
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';


function setItem(data) {
  return {
    type: SET_ITEM,
    payload: {
      data
    }
  };
}

function setFetchError(isError) {
  return {
    type: SET_FETCH_ERROR,
    payload: {
      isError
    }
  };
}

export function setFetchStatus(isFetchCompleted) {
  return {
    type: SET_FETCH_STATUS,
    payload: {
      isFetchCompleted
    }
  };
}

export function fetchItem(illustId) {
  return (dispatch) => {
    dispatch(setFetchError(false));
    return cachedFetch(`${config.apiBaseURL}${config.illustURI}/${illustId}`, {
      mode: 'cors',
      timeout: 10e3
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

function setComments(data) {
  return {
    type: SET_COMMENTS,
    payload: {
      data
    }
  };
}

function setCommentsPage(page) {
  return {
    type: SET_COMMENTS_PAGE,
    payload: {
      page
    }
  };
}

function setCommentsEnd(isCommentsEnd) {
  return {
    type: SET_COMMENTS_END,
    payload: {
      isCommentsEnd
    }
  };
}

function setFetchCommentsError(isError) {
  return {
    type: SET_FETCH_COMMENTS_ERROR,
    payload: {
      isError
    }
  };
}

export function setFetchCommentsStatus(isFetchCompleted) {
  return {
    type: SET_FETCH_COMMENTS_STATUS,
    payload: {
      isFetchCompleted
    }
  };
}

export function fetchComments(illustId) {
  return (dispatch, getState) => {
    dispatch(setFetchCommentsStatus(false));
    dispatch(setFetchCommentsError(false));
    return cachedFetch(`${config.apiBaseURL}${config.commentsURI}/${illustId}`, {
      mode: 'cors',
      timeout: 10e3,
      data: {
        page: getState().illust.page
      }
    })
      .then((data) => {
        if (data.next) {
          dispatch(setCommentsPage(getState().illust.page + 1));
        } else {
          dispatch(setCommentsEnd(true));
        }
        dispatch(setComments(data.comments));
      })
      .then(() => {
        dispatch(setFetchCommentsStatus(true));
      })
      .catch(() => {
        dispatch(setFetchCommentsStatus(true));
        dispatch(setFetchCommentsError(true));
      });
  };
}

export function clearComments() {
  return {
    type: CLEAR_COMMENTS,
    payload: {
      comments: [],
      page: 1,
      isCommentsEnd: false
    }
  };
}
