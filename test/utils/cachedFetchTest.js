import fetchMock from 'fetch-mock';
import { cachedFetch } from '@/utils';

describe('cachedFetch', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetch should return a body when status is 200', async () => {
    fetchMock.mock('*', { hello: 'world' });
    const response = await cachedFetch('http://www.google.com');
    expect(response).to.deep.equal({ hello: 'world' });
  });

  it('fetch should throw Error when status is not 200', async () => {
    fetchMock.mock('*', { status: 400 });
    let err;
    try {
      const response = await cachedFetch('http://www.google.com');
    } catch (e) {
      err = e;
    }
    expect(() => {
      throw err;
    }).to.throw(/response is not OK/);
  });
});
