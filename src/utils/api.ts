import honoka from 'honoka';
import config from '@/config';

honoka.defaults.baseURL = config.apiBaseURL;
honoka.defaults.timeout = 30e3;

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

export const proxyImage = (url: string) => {
  const regex = /^http?s:\/\/(i\.pximg\.net)|(source\.pixiv\.net)/i;
  if (regex.test(url)) {
    return `${config.apiBaseURL}/image/${url.replace(/^http?s:\/\//, '')}`;
  }
  return url;
};

export const auth = (data: { username: string; password: string }) =>
  honoka.post('/auth', { data });
