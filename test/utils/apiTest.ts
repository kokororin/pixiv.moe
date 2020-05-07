import { expect } from 'chai';
import * as api from '@/utils/api';
import config from '@/config';

describe('api', () => {
  it('proxy pixiv image', () => {
    expect(
      api.proxyImage(
        'https://i.pximg.net/c/600x1200_90/img-master/img/2020/04/24/18/00/10/81026143_p0_master1200.jpg'
      )
    ).to.equal(
      `${config.apiBaseURL}/image/i.pximg.net/c/600x1200_90/img-master/img/2020/04/24/18/00/10/81026143_p0_master1200.jpg`
    );
  });
});
