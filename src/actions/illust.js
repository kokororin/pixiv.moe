import namespacedTypes from 'namespaced-types';
import honoka from 'honoka';

import config from '@/config';
import getImagesFromZip from '@/utils/getImagesFromZip';

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
    return honoka
      .get(`${config.illustURI}/${illustId}`)
      .then(data => {
        if (data.status === 'success') {
          if (
            data.response.metadata &&
            typeof data.response.metadata.zip_urls === 'object' &&
            data.response.metadata.zip_urls
          ) {
            const zipURL =
              data.response.metadata.zip_urls[
                Object.keys(data.response.metadata.zip_urls)[0]
              ];
            getImagesFromZip(zipURL)
              .then(images => {
                data.response.metadata.zip_images = images;
                dispatch(setItem(data.response));
              })
              .then(() => {
                dispatch(setFetchStatus(false));
              });
          } else {
            dispatch(setItem(data.response.illust));
            dispatch(setFetchStatus(false));
          }
        } else {
          dispatch(setFetchError(true));
        }
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
    return honoka
      .get(`${config.commentsURI}/${illustId}`, {
        data: {
          page: getState().illust.page
        }
      })
      .then(data => {
        if (data.status === 'success' && data.response.comments) {
          if (data.response.next) {
            dispatch(setCommentsPage(getState().illust.page + 1));
          } else {
            dispatch(setCommentsEnd(true));
          }
          dispatch(setComments(data.response.comments));
        }
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
