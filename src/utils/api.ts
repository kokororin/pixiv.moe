import honoka from 'honoka';
import { Dispatch } from 'redux';
import config from '@/config';
import Storage from '@/utils/Storage';
import * as AuthActions from '@/actions/auth';
import { IAuthAction } from '@/actions/auth';

honoka.defaults.baseURL = config.apiBaseURL;
honoka.defaults.timeout = 30e3;

export const getAuth = () => {
  return Storage.get('auth');
};

export const setAuth = (authData: any, dispatch?: Dispatch<IAuthAction>) => {
  dispatch?.(AuthActions.setAuth(authData));
  return Storage.set('auth', authData);
};

export const removeAuth = (dispatch: Dispatch<IAuthAction>) => {
  dispatch(AuthActions.setAuth(null));
  return Storage.remove('auth');
};

export const tags = () => honoka.get('/trending/tags');

export const ranking = (page: number) =>
  honoka.get('/ranking', {
    data: {
      page
    }
  });

export const search = (data: { word: string; page: number }) =>
  honoka.get('/search', {
    data
  });

export const illust = (illustId: number | string) =>
  honoka.get(`/illust/${illustId}`);

export const illustComments = (
  illustId: number | string,
  data: {
    page: number;
  }
) =>
  honoka.get(`/illust/comments/${illustId}`, {
    data
  });

export const illustBookmarkDetail = (illustId: number | string) =>
  honoka.get(`/illust/bookmark/${illustId}`, {
    headers: {
      'X-Access-Token': getAuth()?.access_token || 'no-token'
    }
  });

export const illustBookmarkAdd = (illustId: number | string) =>
  honoka.post(`/illust/bookmark/${illustId}`, {
    headers: {
      'X-Access-Token': getAuth()?.access_token || 'no-token'
    }
  });

export const illustBookmarkDelete = (illustId: number | string) =>
  honoka.delete(`/illust/bookmark/${illustId}`, {
    headers: {
      'X-Access-Token': getAuth()?.access_token || 'no-token'
    }
  });

export const proxyImage = (url: string) => {
  const regex = /^http?s:\/\/(i\.pximg\.net)|(source\.pixiv\.net)/i;
  if (regex.test(url)) {
    return `${config.apiBaseURL}/image/${url.replace(/^http?s:\/\//, '')}`;
  }
  return url;
};

export const auth = (data: {
  username?: string;
  password?: string;
  refreshToken?: string;
}) =>
  honoka.post('/auth', {
    data: {
      username: data.username,
      password: data.password,
      refresh_token: data.refreshToken
    }
  });

export const refreshToken = () => {
  const authData = getAuth();
  if (authData?.refresh_token) {
    auth({ refreshToken: authData.refresh_token }).then(data => {
      if (data.status === 'success') {
        setAuth(data.response);
      }
    });
  }
};
