import { Action, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import namespacedTypes from 'namespaced-types';
import honoka from 'honoka';

import config from '@/config';
import { ICombinedState } from '@/reducers';

export interface IGalleryActionValues {
  SET_ITEMS: string;
  SET_IMAGES: string;
  SET_PAGE: string;
  SET_FETCH_ERROR: string;
  SET_FETCH_STATUS: string;
  SET_WORD: string;
  CLEAR_SOURCE: string;
  SET_ERROR_TIMES: string;
  CLEAR_ERROR_TIMES: string;
  SET_FROM_ILLUST: string;
}

export const types = namespacedTypes('gallery', [
  'SET_ITEMS',
  'SET_IMAGES',
  'SET_PAGE',
  'SET_FETCH_ERROR',
  'SET_FETCH_STATUS',
  'SET_WORD',
  'CLEAR_SOURCE',
  'SET_ERROR_TIMES',
  'CLEAR_ERROR_TIMES',
  'SET_FROM_ILLUST'
]) as IGalleryActionValues;

export interface IGalleryAction {
  type: string;
  payload?: any;
}

export type TGalleryThunkAction = ThunkAction<
  void,
  ICombinedState,
  undefined,
  AnyAction
>;

export type TGalleryThunkDispatch = ThunkDispatch<
  ICombinedState,
  undefined,
  Action
>;

export function setItems(data: any[]) {
  return {
    type: types.SET_ITEMS,
    payload: {
      data
    }
  };
}

export function setPage(page: number) {
  return {
    type: types.SET_PAGE,
    payload: {
      page
    }
  };
}

function setFetchError(isError: boolean) {
  return {
    type: types.SET_FETCH_ERROR,
    payload: {
      isError
    }
  };
}

function setFetchStatus(isFetching: boolean) {
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

function fetchSource(): TGalleryThunkAction {
  return (dispatch, getState) => {
    dispatch(setFetchError(false));
    dispatch(setFetchStatus(true));
    if (getState().gallery.word === 'ranking') {
      return honoka
        .get(config.rankingURI, {
          data: {
            page: getState().gallery.page
          }
        })
        .then(data => {
          if (
            data.status === 'success' &&
            data.response.illusts &&
            data.response.illusts.length > 0
          ) {
            data.response.illusts.forEach((elem: any) => {
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

    return honoka
      .get(config.searchURI, {
        mode: 'cors',
        timeout: 30e3,
        data: {
          word: getState().gallery.word,
          page: getState().gallery.page
        }
      })
      .then(data => {
        if (
          data.status === 'success' &&
          data.response.illusts &&
          data.response.illusts.length > 0
        ) {
          data.response.illusts.forEach((elem: any) => {
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

export function fetchSourceIfNeeded(): TGalleryThunkAction {
  return (dispatch, getState) => {
    if (!getState().gallery.isFetching) {
      return dispatch(fetchSource());
    }
  };
}

export function setWord(word: string) {
  return {
    type: types.SET_WORD,
    payload: {
      word
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

export function setFromIllust(fromIllust: boolean) {
  return {
    type: types.SET_FROM_ILLUST,
    payload: fromIllust
  };
}
