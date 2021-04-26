import * as api from './api';
import config from '../config';

test('proxy pixiv image', () => {
  expect(
    api.proxyImage(
      'https://i.pximg.net/c/600x1200_90/img-master/img/2020/04/24/18/00/10/81026143_p0_master1200.jpg'
    )
  ).toEqual(
    `${config.apiBaseURL}/image/i.pximg.net/c/600x1200_90/img-master/img/2020/04/24/18/00/10/81026143_p0_master1200.jpg`
  );
});
