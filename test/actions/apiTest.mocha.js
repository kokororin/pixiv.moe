import fetch from 'node-fetch';
import assert from 'power-assert';
import config from '../../src/config';

function request(url, options) {
  return fetch(url, options).then(response => response.json());
}

describe('api', () => {
  it('Ranking List', async () => {
    const data = await request(`${config.apiBaseURL}${config.rankingURI}`);
    assert.equal(data.status, 'success');
    assert.equal(Array.isArray(data.response.works), true);
  });

  it('Illust List', async () => {
    const data = await request(
      `${config.apiBaseURL}${config.galleryURI}?tag=nico`
    );
    assert.equal(data.status, 'success');
    assert.equal(Array.isArray(data.response), true);
  });

  it('Illust Detail', async () => {
    const data = await request(
      `${config.apiBaseURL}${config.illustURI}/63167224`
    );
    assert.equal(data.status, 'success');
    assert.equal(
      Object.prototype.toString.call(data.response),
      '[object Object]'
    );
  });

});
